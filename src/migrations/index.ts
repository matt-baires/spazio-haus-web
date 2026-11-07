import * as migration_20261107_234908_inicial from './20261107_234908_inicial';

export const migrations = [
  {
    up: migration_20261107_234908_inicial.up,
    down: migration_20261107_234908_inicial.down,
    name: '20261107_234908_inicial'
  },
];
