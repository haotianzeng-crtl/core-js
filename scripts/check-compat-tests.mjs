import { modules } from 'core-js-compat/src/data.mjs';
import '../tests/compat/tests.js';

const modulesSet = new Set([
  ...modules,
  // TODO: drop those special cases from core-js@4
  'es.aggregate-error.constructor',
  'es.data-view.constructor',
  'es.map.constructor',
  'es.string.trim-left',
  'es.string.trim-right',
  'es.symbol.constructor',
  'es.symbol.for',
  'es.symbol.key-for',
  'es.object.get-own-property-symbols',
  'es.promise.constructor',
  'es.promise.all',
  'es.promise.catch',
  'es.promise.race',
  'es.promise.reject',
  'es.promise.resolve',
  'es.set.constructor',
  'es.weak-map.constructor',
  'es.weak-set.constructor',
  'esnext.observable.constructor',
  'esnext.observable.from',
  'esnext.observable.of',
  'web.clear-immediate',
  'web.set-immediate',
  'web.set-interval',
  'web.set-timeout',
  'web.url-search-params.constructor',
  'web.url.constructor',
]);
const tested = new Set(Object.keys(globalThis.tests));
const ignore = new Set([
  'es.aggregate-error',
  'es.data-view',
  'es.map',
  'es.set',
  'es.weak-map',
  'es.weak-set',
  'esnext.aggregate-error',
  'esnext.array.filter-out',
  'esnext.array.last-index',
  'esnext.array.last-item',
  'esnext.map.update-or-insert',
  'esnext.map.upsert',
  'esnext.math.iaddh',
  'esnext.math.imulh',
  'esnext.math.isubh',
  'esnext.math.seeded-prng',
  'esnext.math.umulh',
  'esnext.object.iterate-entries',
  'esnext.object.iterate-keys',
  'esnext.object.iterate-values',
  'esnext.promise.try',
  'esnext.reflect.define-metadata',
  'esnext.reflect.delete-metadata',
  'esnext.reflect.get-metadata',
  'esnext.reflect.get-metadata-keys',
  'esnext.reflect.get-own-metadata',
  'esnext.reflect.get-own-metadata-keys',
  'esnext.reflect.has-metadata',
  'esnext.reflect.has-own-metadata',
  'esnext.reflect.metadata',
  'esnext.string.at',
  'esnext.symbol.pattern-match',
  'esnext.symbol.replace-all',
  'esnext.typed-array.from-async',
  'esnext.typed-array.filter-out',
  'esnext.typed-array.group-by',
  'esnext.weak-map.upsert',
  'web.url-search-params',
  'web.url',
]);

const missed = modules.filter(it => !(tested.has(it) || tested.has(it.replace(/^esnext\./, 'es.')) || ignore.has(it)));

for (const it of tested) {
  if (!modulesSet.has(it)) console.log(chalk.red(`added extra compat data test: ${ chalk.cyan(it) }`));
}

if (missed.length) {
  console.log(chalk.red('some of compat data tests missed:'));
  for (const it of missed) console.log(chalk.cyan(it));
} else console.log(chalk.green('adding of compat data tests not required'));
