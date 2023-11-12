const dbConfig = {
  synchronize: false,
  migrations: ['dist/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  migrationsTableName: 'migrations',
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'mysql',
      database: 'travel',
      entities: ['dist/**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'mysql',
      database: 'travel',
      entities: ['dist/**/*.entity.ts'],
    });
    break;
  case 'production':
    break;
  default:
    throw new Error('서버 환경설정이 없습니다.');
}

export default dbConfig;
