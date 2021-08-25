## TODO
* Because we have a contract with `new Date()` and we have frozen the time, do we need to be able to change the `now` for different tests?
* We need to have config to redefine `now` for `new Date()`
* Add support to promise function

## DONE
* What should we do with void functions? Can we have contract with something that doesn't return any value?
* We should be able to have one contract for an object that has multiple functions, so we don't need to copy `source` for every function again.
* How should we solve if the return is function, should we execute then and compare results?
