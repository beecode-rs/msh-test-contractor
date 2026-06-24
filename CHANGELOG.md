# [1.0.0](https://github.com/beecode-rs/msh-test-contractor/compare/v0.4.2...v1.0.0) (2026-06-24)


* refactor!: restructure to clean-typescript layout and add YAML contracts ([#73](https://github.com/beecode-rs/msh-test-contractor/issues/73)) ([2c528ca](https://github.com/beecode-rs/msh-test-contractor/commit/2c528caf4ef1145b95a2c2bdd4885e1d91057eef))


### BREAKING CHANGES

* Introduce *.contract.yaml as the prefeand
restructure the package around a clean-typescript layout.

Contract YAML support:
- add vitest plugin that discovers and
- add custom contract reporter for test output, exported as a subpath
- support !undefined YAML tag and use ields
- rename default method key to __self__
- serialize undefined values in test n

Restructure & docs:
- restructure to clean-typescript layoent)
- rename files for domain clarity and update import paths and exports
- rename skill to test-contractor and expand project-setup workflow docs
- split reference docs into separate f

Build & tooling:
- drop CommonJS build support, ship ESM-only (dist/)
- replace babel with tsc for compilati
- point main entry to dist/ and simplify exports
- update .nvmrc to Node 22.22.1

Dependencies:
- migrate to js-yaml v5 API
- upgrade msh-logger to v2 and msh-config to v1.2.0
- remove unused dev deps (ts-node, tsc
  vite-tsconfig-paths)
- fix husky hooks to load nvm before execution
- add package-lock.json and remove sta

## [0.4.2](https://github.com/beecode-rs/msh-test-contractor/compare/v0.4.1...v0.4.2) (2026-05-25)


### Bug Fixes

* default constructorParams to empty array ([#72](https://github.com/beecode-rs/msh-test-contractor/issues/72)) ([fe6a551](https://github.com/beecode-rs/msh-test-contractor/commit/fe6a5515a948f030cf0d073499c90f3f62c57cf3))

## [0.4.1](https://github.com/beecode-rs/msh-test-contractor/compare/v0.4.0...v0.4.1) (2026-05-21)


### Bug Fixes

* repository url prefix ([4cd7a96](https://github.com/beecode-rs/msh-test-contractor/commit/4cd7a9662464e33571c49528bf1f5f1170df98fb))

# [0.4.0](https://github.com/beecode-rs/msh-test-contractor/compare/v0.3.9...v0.4.0) (2026-05-21)


### Bug Fixes

* correct module path in contractFactory configuration ([5c17b93](https://github.com/beecode-rs/msh-test-contractor/commit/5c17b937276b79a8087e4017b2ff4896fd5ded35))
* refactor ESLint configuration and update dependencies ([0e26b62](https://github.com/beecode-rs/msh-test-contractor/commit/0e26b62bbd047aa77f4a711606997364e9e06bf9))
* remove build artifacts from version control ([0bc20e5](https://github.com/beecode-rs/msh-test-contractor/commit/0bc20e52cabac5764343641f01bbc289aefbe7df))
* update Node.js version, add Prettier configuration, and refactor type imports ([b0127d2](https://github.com/beecode-rs/msh-test-contractor/commit/b0127d2f7bb7eaa8bdfc8365e57921934955c1a3))
* update package dependencies to latest versions ([103b89d](https://github.com/beecode-rs/msh-test-contractor/commit/103b89d118dbff5b5d160e4512a3ee78bbc4c7ba))
* update package dependencies to latest versions ([83ff3ad](https://github.com/beecode-rs/msh-test-contractor/commit/83ff3ad93e04ce82a61920aaad48c433f8ac5657))
* update package.json ([fd9ea9b](https://github.com/beecode-rs/msh-test-contractor/commit/fd9ea9b1bb8953b871bd2a8e21d45bee3ffe80c7))
* update package.json ([#8](https://github.com/beecode-rs/msh-test-contractor/issues/8)) ([ec5ca92](https://github.com/beecode-rs/msh-test-contractor/commit/ec5ca92a78668a12ea019fe413990154c4e049a4))
* update package.json, esmodule remove alias, use vitest instead of jest ([#15](https://github.com/beecode-rs/msh-test-contractor/issues/15)) ([679dc68](https://github.com/beecode-rs/msh-test-contractor/commit/679dc68c4c354f4af051f4807cf317add4c32423))
* update package.json, use shared config for eslint and prettier ([94a3330](https://github.com/beecode-rs/msh-test-contractor/commit/94a33308628f582a96b320816af7ad933279655a))
* update packages.json ([7b151f1](https://github.com/beecode-rs/msh-test-contractor/commit/7b151f14cc53d33992f2c59430e897ff4b409e89))
* use dynamic user in chown command ([a7b33d1](https://github.com/beecode-rs/msh-test-contractor/commit/a7b33d1dfe26f769c7c0ef75a5202e9031749310))


### Features

* add shared semantic release config ([34f5c7f](https://github.com/beecode-rs/msh-test-contractor/commit/34f5c7fd1cc5a15664029ebabe21ec7669b96152))
* add YAML contract format support with parser, validator, and loader ([#71](https://github.com/beecode-rs/msh-test-contractor/issues/71)) ([1d04ca4](https://github.com/beecode-rs/msh-test-contractor/commit/1d04ca47efdce25004c884e9d4b217e06407183e))
* es modules and commonjs build ([eb6a82b](https://github.com/beecode-rs/msh-test-contractor/commit/eb6a82bd3b5b8df2f8e2a54ddfff674f5c4eadae))
* replace jest with vitest ([#66](https://github.com/beecode-rs/msh-test-contractor/issues/66)) ([404c785](https://github.com/beecode-rs/msh-test-contractor/commit/404c7852e87a2b8c0f32155f12d323a6fb0ab757))

## [0.3.9](https://github.com/beecode-rs/msh-test-contractor/compare/v0.3.8...v0.3.9) (2022-10-16)


### Bug Fixes

* update package.json ([90271cd](https://github.com/beecode-rs/msh-test-contractor/commit/90271cdf97150de50f455fb9ad0b2847799cddf9))

## [0.3.8](https://github.com/beecode-rs/msh-test-contractor/compare/v0.3.7...v0.3.8) (2022-10-16)


### Bug Fixes

* add src to release ([9a600ef](https://github.com/beecode-rs/msh-test-contractor/commit/9a600efb99b3f2502aa0c309bbe9d0445951ac5f))

## [0.3.7](https://github.com/beecode-rs/msh-test-contractor/compare/v0.3.6...v0.3.7) (2022-02-27)


### Bug Fixes

* update package.json ([f5d2d6e](https://github.com/beecode-rs/msh-test-contractor/commit/f5d2d6e2d5464002cd0f23d7dffae2cc0f805b8a))

## [0.3.6](https://github.com/beecode-rs/msh-test-contractor/compare/v0.3.5...v0.3.6) (2022-02-27)


### Bug Fixes

* update package.json ([d5c2a6f](https://github.com/beecode-rs/msh-test-contractor/commit/d5c2a6fef0a07166633feb48851e87563c9cd9f2))

## [0.3.5](https://github.com/beecode-rs/msh-test-contractor/compare/v0.3.4...v0.3.5) (2021-11-22)


### Bug Fixes

* versioning ([78df6b8](https://github.com/beecode-rs/msh-test-contractor/commit/78df6b87f459a8cf3f049d91fa72b0fe3e5dcafa))

## [0.3.4](https://github.com/beecode-rs/msh-test-contractor/compare/v1.3.3...v1.3.4) (2021-11-21)


### Bug Fixes

* update packages ([ab6bf5f](https://github.com/beecode-rs/msh-test-contractor/commit/ab6bf5ffaff00a6f6f3df04933ad95cb6749fc43))

## [0.3.3](https://github.com/beecode-rs/msh-test-contractor/compare/v1.3.2...v1.3.3) (2021-09-27)


### Bug Fixes

* improvement ([b3aeaa0](https://github.com/beecode-rs/msh-test-contractor/commit/b3aeaa0846342630c9a57fe4f70510be59c86869))

## [0.3.2](https://github.com/beecode-rs/msh-test-contractor/compare/v1.3.1...v1.3.2) (2021-09-03)


### Bug Fixes

* update mocker ([dba1658](https://github.com/beecode-rs/msh-test-contractor/commit/dba165829f02d419c84ff270c8168b997334d121))

## [0.3.1](https://github.com/beecode-rs/msh-test-contractor/compare/v1.3.0...v1.3.1) (2021-09-02)


### Bug Fixes

* update package ([e866393](https://github.com/beecode-rs/msh-test-contractor/commit/e866393e93b8570fbad810e7b480f46b6d363777))

# [0.3.0](https://github.com/beecode-rs/msh-test-contractor/compare/v1.2.1...v1.3.0) (2021-09-02)


### Features

* add moduleMock, refactor contracts ([e900856](https://github.com/beecode-rs/msh-test-contractor/commit/e90085601cd187c5ed7c36e9f84c2d662eeec760))

## [0.2.1](https://github.com/beecode-rs/msh-test-contractor/compare/v1.2.0...v1.2.1) (2021-08-31)


### Bug Fixes

* do not use .t.ts files ([7be43d7](https://github.com/beecode-rs/msh-test-contractor/commit/7be43d76d693c65bab7108826c66e54bdf20004e))

# [0.2.0](https://github.com/beecode-rs/msh-test-contractor/compare/v1.1.0...v1.2.0) (2021-08-30)


### Features

* contract without subject ([ecd8b50](https://github.com/beecode-rs/msh-test-contractor/commit/ecd8b506dd61ee77de1c18034a089252063948c4))

# [0.1.0](https://github.com/beecode-rs/msh-test-contractor/compare/v1.0.1...v1.1.0) (2021-08-30)


### Bug Fixes

* tests ([65ba1a2](https://github.com/beecode-rs/msh-test-contractor/commit/65ba1a25b476f959c786fae74e7e3925f50adec3))


### Features

* add expect to throw error ([5fcf7ef](https://github.com/beecode-rs/msh-test-contractor/commit/5fcf7ef4faa0b24bb268854986f6c68838a98475))

## [0.0.1](https://github.com/beecode-rs/msh-test-contractor/compare/v1.0.0...v1.0.1) (2021-08-29)


### Bug Fixes

* tests ([e156d10](https://github.com/beecode-rs/msh-test-contractor/commit/e156d106b6c2bf60a354f69966bf8b2c17c16479))
* update project ([4a6f9ae](https://github.com/beecode-rs/msh-test-contractor/commit/4a6f9ae149ade6907328f72ba6c981ed5c604db8))

# 1.0.0 (2021-08-26)


### Bug Fixes

* types ([7ff2592](https://github.com/beecode-rs/msh-test-contractor/commit/7ff2592143b395ba4b032d07951363c72a096499))


### Features

* add contract expect strategy ([0542d3d](https://github.com/beecode-rs/msh-test-contractor/commit/0542d3d9cebebf691a31bf2c9672ffbb4b5e958c))
* add contract mocker ([684f8bc](https://github.com/beecode-rs/msh-test-contractor/commit/684f8bcdc75fafde8c3c7edcfe743f90f58cdd9b))
* class contract ([61b3f54](https://github.com/beecode-rs/msh-test-contractor/commit/61b3f54f91977f12fcc20131ef8514a5e35b0aa9))
* structure cleanup ([5598e66](https://github.com/beecode-rs/msh-test-contractor/commit/5598e66041d83d401b8f0507e841066bfad6bf26))
* updated format and contract nesting ([8ff8300](https://github.com/beecode-rs/msh-test-contractor/commit/8ff8300720ec313160300b4eaabf9be7f2e7c15f))
