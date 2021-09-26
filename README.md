[![Build Status](https://beecode.semaphoreci.com/badges/msh-test-contractor/branches/main.svg?style=shields)](https://beecode.semaphoreci.com/projects/msh-test-contractor)
[![codecov](https://codecov.io/gh/beecode-rs/msh-test-contractor/branch/main/graph/badge.svg?token=wOOqEekQfv)](https://codecov.io/gh/beecode-rs/msh-test-contractor)
[![GitHub license](https://img.shields.io/github/license/beecode-rs/msh-test-contractor)](https://github.com/beecode-rs/msh-test-contractor/blob/main/LICENSE)  
[![NPM](https://nodei.co/npm/@beecode/msh-test-contractor.png)](https://nodei.co/npm/@beecode/msh-test-contractor)


# msh-test-contractor

<!-- toc -->

<!-- tocstop -->

## Idea

Inspired by [J B Rainsberger Integrated Tests Are A Scam HD
](https://www.youtube.com/watch?v=VDfX44fZoMc). This tool will try to make unit tests more reliable.  
When writing unit tests your unit usually makes a call outside of it's boundaries, and we need to mock that call. Whit test-contractor we can create contract between those two units(provider/consumer). This contract defines the obligation of the function (provider) if the certain parameters are passed to it that it will return certain result. This contract is then used for mocking the external unit, and it's also used for data in testing the provider to confirm that the contract is valid.

## Install

`npm i @beecode/msh-test-contractor`
