import * as migration_20261107_234908_inicial from './20261107_234908_inicial';
import * as migration_20261126_203431_quitar_blog from './20261126_203431_quitar_blog';

export const migrations = [
  {
    up: migration_20261107_234908_inicial.up,
    down: migration_20261107_234908_inicial.down,
    name: '20261107_234908_inicial',
  },
  {
    up: migration_20261126_203431_quitar_blog.up,
    down: migration_20261126_203431_quitar_blog.down,
    name: '20261126_203431_quitar_blog'
  },
];
