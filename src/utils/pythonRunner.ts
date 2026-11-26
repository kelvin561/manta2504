// Lightweight, safe client-side Python-subset evaluator for teaching snippets.
// Supports variables, ints/floats/strings/booleans, lists, list comprehensions,
// simple def functions, for-loops over range/lists, if/elif/else, f-strings,
// len(), sum(), round(), min(), max(), and print().

type PyValue = number | string | boolean | PyValue[];

interface PyFunction {
  params: string[];
  body: string[];
}

function splitTopLevel(expr: string, delimiter = ','): string[] {
  const parts: string[] = [];
  let current = '';
  let depthParen = 0;
  let depthBracket = 0;
  let quote: string | null = null;

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (quote) {
      current += ch;
      if (ch === quote && expr[i - 1] !== '\\') {
        quote = null;
      }
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      current += ch;
      continue;
    }
    if (ch === '(') depthParen++;
    else if (ch === ')') depthParen--;
    else if (ch === '[') depthBracket++;
    else if (ch === ']') depthBracket--;

    if (ch === delimiter && depthParen === 0 && depthBracket === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim() !== '') {
    parts.push(current.trim());
  }
  return parts;
}

function formatPyValue(val: PyValue): string {
  if (Array.isArray(val)) {
    return `[${val.map((v) => (typeof v === 'string' ? `'${v}'` : formatPyValue(v))).join(', ')}]`;
  }
  if (typeof val === 'boolean') return val ? 'True' : 'False';
  return String(val);
}

function evalExpression(
  rawExpr: string,
  env: Record<string, PyValue>,
  funcs: Record<string, PyFunction>
): PyValue {
  const expr = rawExpr.trim();

  // f-string: f"..." or f'...'
  if ((expr.startsWith('f"') && expr.endsWith('"')) || (expr.startsWith("f'") && expr.endsWith("'"))) {
    const inner = expr.slice(2, -1);
    return inner.replace(/\{([^}]+)\}/g, (_, inside) => {
      const val = evalExpression(inside, env, funcs);
      return formatPyValue(val);
    });
  }

  // String literal
  if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
    return expr.slice(1, -1);
  }

  // Booleans
  if (expr === 'True') return true;
  if (expr === 'False') return false;

  // Number literal
  if (/^-?\d+(\.\d+)?$/.test(expr)) {
    return Number(expr);
  }

  // List comprehension: [expr for var in iterable (if cond)?]
  if (expr.startsWith('[') && expr.endsWith(']')) {
    const inner = expr.slice(1, -1).trim();
    const compMatch = inner.match(/^(.+?)\s+for\s+([a-zA-Z_]\w*)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);
    if (compMatch) {
      const [, mapExpr, loopVar, iterExpr, condExpr] = compMatch;
      const iterable = evalExpression(iterExpr, env, funcs);
      if (!Array.isArray(iterable)) {
        throw new Error(`Cannot iterate over non-list in comprehension: ${iterExpr}`);
      }
      const result: PyValue[] = [];
      for (const item of iterable) {
        const localEnv = { ...env, [loopVar]: item };
        if (condExpr) {
          if (!evalCondition(condExpr, localEnv, funcs)) continue;
        }
        result.push(evalExpression(mapExpr, localEnv, funcs));
      }
      return result;
    }

    if (inner === '') return [];
    const items = splitTopLevel(inner, ',');
    return items.map((item) => evalExpression(item, env, funcs));
  }

  // Variable lookup
  if (/^[a-zA-Z_]\w*$/.test(expr)) {
    if (expr in env) return env[expr];
    throw new Error(`NameError: name '${expr}' is not defined`);
  }

  // Indexing: arr[idx]
  const indexMatch = expr.match(/^([a-zA-Z_]\w*)\[(.+)\]$/);
  if (indexMatch) {
    const [, varName, idxExpr] = indexMatch;
    const target = env[varName];
    const idx = evalExpression(idxExpr, env, funcs);
    if (Array.isArray(target) && typeof idx === 'number') {
      return target[idx];
    }
    throw new Error(`Invalid indexing on ${varName}`);
  }

  // Function call: name(args...)
  const callMatch = expr.match(/^([a-zA-Z_]\w*)\((.*)\)$/);
  if (callMatch) {
    const [, fnName, argsRaw] = callMatch;
    const args = argsRaw.trim() === '' ? [] : splitTopLevel(argsRaw, ',').map((a) => evalExpression(a, env, funcs));

    if (fnName === 'len') {
      const target = args[0];
      if (Array.isArray(target) || typeof target === 'string') return target.length;
      throw new Error('len() expects a list or string');
    }
    if (fnName === 'sum') {
      const target = args[0];
      if (!Array.isArray(target)) throw new Error('sum() expects a list');
      return target.reduce<number>((acc, v) => acc + Number(v), 0);
    }
    if (fnName === 'round') {
      const num = Number(args[0]);
      const digits = args[1] !== undefined ? Number(args[1]) : 0;
      const factor = Math.pow(10, digits);
      return Math.round(num * factor) / factor;
    }
    if (fnName === 'min') {
      const target = Array.isArray(args[0]) ? args[0] : args;
      return Math.min(...target.map(Number));
    }
    if (fnName === 'max') {
      const target = Array.isArray(args[0]) ? args[0] : args;
      return Math.max(...target.map(Number));
    }
    if (fnName === 'range') {
      if (args.length === 1) {
        const end = Number(args[0]);
        return Array.from({ length: Math.max(0, end) }, (_, i) => i);
      }
      if (args.length >= 2) {
        const start = Number(args[0]);
        const end = Number(args[1]);
        const arr: number[] = [];
        for (let i = start; i < end; i++) arr.push(i);
        return arr;
      }
    }
    if (fnName in funcs) {
      const fn = funcs[fnName];
      const localEnv: Record<string, PyValue> = { ...env };
      fn.params.forEach((param, idx) => {
        localEnv[param] = args[idx] ?? '';
      });
      const ret = executeBlock(fn.body, localEnv, funcs, []);
      return ret.returnValue ?? '';
    }
    throw new Error(`NameError: function '${fnName}' is not defined`);
  }

  // Binary arithmetic (+, -, *, /) respecting basic precedence
  const jsSafeExpr = expr.replace(/\b([a-zA-Z_]\w*)\b/g, (token) => {
    if (token in env) {
      const val = env[token];
      return typeof val === 'string' ? JSON.stringify(val) : String(val);
    }
    return token;
  });

  // Only allow safe arithmetic & string concat expressions via recursive / simple evaluation
  // Handle simple a op b if not a function call
  for (const op of ['+', '-', '*', '/']) {
    const parts = splitTopLevel(expr, op);
    if (parts.length === 2 && parts[0] !== '' && parts[1] !== '') {
      const left = evalExpression(parts[0], env, funcs);
      const right = evalExpression(parts[1], env, funcs);
      if (op === '+') {
        if (typeof left === 'string' || typeof right === 'string') {
          return String(left) + String(right);
        }
        return Number(left) + Number(right);
      }
      if (op === '-') return Number(left) - Number(right);
      if (op === '*') return Number(left) * Number(right);
      if (op === '/') {
        if (Number(right) === 0) throw new Error('ZeroDivisionError: division by zero');
        return Number(left) / Number(right);
      }
    }
  }

  // Fallback for parenthesized expression
  if (expr.startsWith('(') && expr.endsWith(')')) {
    return evalExpression(expr.slice(1, -1), env, funcs);
  }

  throw new Error(`Could not evaluate expression: ${jsSafeExpr}`);
}

function evalCondition(
  cond: string,
  env: Record<string, PyValue>,
  funcs: Record<string, PyFunction>
): boolean {
  const operators = ['>=', '<=', '==', '!=', '>', '<'];
  for (const op of operators) {
    const idx = cond.indexOf(op);
    if (idx !== -1) {
      const left = evalExpression(cond.slice(0, idx), env, funcs);
      const right = evalExpression(cond.slice(idx + op.length), env, funcs);
      if (op === '>=') return Number(left) >= Number(right);
      if (op === '<=') return Number(left) <= Number(right);
      if (op === '==') return left === right;
      if (op === '!=') return left !== right;
      if (op === '>') return Number(left) > Number(right);
      if (op === '<') return Number(left) < Number(right);
    }
  }
  return Boolean(evalExpression(cond, env, funcs));
}

function getIndent(line: string): number {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
}

function executeBlock(
  lines: string[],
  env: Record<string, PyValue>,
  funcs: Record<string, PyFunction>,
  output: string[]
): { returnValue?: PyValue } {
  let i = 0;
  while (i < lines.length) {
    const raw = lines[i];
    const trimmed = raw.trim();
    if (trimmed === '' || trimmed.startsWith('#')) {
      i++;
      continue;
    }

    const baseIndent = getIndent(raw);

    // def fn(params):
    const defMatch = trimmed.match(/^def\s+([a-zA-Z_]\w*)\(([^)]*)\):$/);
    if (defMatch) {
      const [, fnName, paramsRaw] = defMatch;
      const params = paramsRaw
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);
      const body: string[] = [];
      i++;
      while (i < lines.length && (lines[i].trim() === '' || getIndent(lines[i]) > baseIndent)) {
        body.push(lines[i]);
        i++;
      }
      funcs[fnName] = { params, body };
      continue;
    }

    // for var in iterable:
    const forMatch = trimmed.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+(.+):$/);
    if (forMatch) {
      const [, loopVar, iterExpr] = forMatch;
      const body: string[] = [];
      i++;
      while (i < lines.length && (lines[i].trim() === '' || getIndent(lines[i]) > baseIndent)) {
        body.push(lines[i]);
        i++;
      }
      const iterable = evalExpression(iterExpr, env, funcs);
      if (!Array.isArray(iterable)) {
        throw new Error(`TypeError: '${iterExpr}' is not iterable`);
      }
      for (const item of iterable) {
        env[loopVar] = item;
        const res = executeBlock(body, env, funcs, output);
        if (res.returnValue !== undefined) return res;
      }
      continue;
    }

    // if cond:
    const ifMatch = trimmed.match(/^if\s+(.+):$/);
    if (ifMatch) {
      const [, condExpr] = ifMatch;
      const ifBody: string[] = [];
      const elseBody: string[] = [];
      i++;
      while (i < lines.length && (lines[i].trim() === '' || getIndent(lines[i]) > baseIndent)) {
        ifBody.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim() === 'else:' && getIndent(lines[i]) === baseIndent) {
        i++;
        while (i < lines.length && (lines[i].trim() === '' || getIndent(lines[i]) > baseIndent)) {
          elseBody.push(lines[i]);
          i++;
        }
      }
      const branch = evalCondition(condExpr, env, funcs) ? ifBody : elseBody;
      const res = executeBlock(branch, env, funcs, output);
      if (res.returnValue !== undefined) return res;
      continue;
    }

    // return expr
    if (trimmed.startsWith('return ')) {
      const val = evalExpression(trimmed.slice(7), env, funcs);
      return { returnValue: val };
    }

    // print(...)
    const printMatch = trimmed.match(/^print\((.*)\)$/);
    if (printMatch) {
      const argsRaw = printMatch[1].trim();
      if (argsRaw === '') {
        output.push('');
      } else {
        const args = splitTopLevel(argsRaw, ',').map((a) => evalExpression(a, env, funcs));
        output.push(args.map(formatPyValue).join(' '));
      }
      i++;
      continue;
    }

    // assignment: var = expr
    const assignMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
    if (assignMatch) {
      const [, varName, valExpr] = assignMatch;
      env[varName] = evalExpression(valExpr, env, funcs);
      i++;
      continue;
    }

    // standalone expression
    evalExpression(trimmed, env, funcs);
    i++;
  }
  return {};
}

export function runPythonSnippet(code: string): { output: string[]; error: string | null } {
  const output: string[] = [];
  const env: Record<string, PyValue> = {};
  const funcs: Record<string, PyFunction> = {};
  try {
    executeBlock(code.split('\n'), env, funcs, output);
    return { output, error: null };
  } catch (err) {
    return {
      output,
      error: err instanceof Error ? err.message : 'Unable to execute Python snippet.',
    };
  }
}
