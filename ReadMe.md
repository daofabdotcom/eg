# Overview
ProjectManager provides
- add and remove notorizer.
- create project.
- notorize project.
- get hash of project.

Process:
1) first develop in remix IDE. Tested manually in remix IDE.
2) ported to truffles and write test suites for more automated testing.

# How to run it
- install truffle
http://truffleframework.com/docs/getting_started/installation

- install Ganache
http://truffleframework.com/docs/ganache/using
Ganache provide private test chainblock.

- run "truffle compile"
- run "truffle migrate"
- run "truffle test" or "truffle test test/xxx" where xxx is the name of the file.

## Others

### Debug
Run " truffle debug xxxx" where xxxx is the transaction hash.  

### "Reset"
Once in a while when you run into "funny/odd" errors, you would have to wide things clean and start all over.
- Ganche.  
  - Go to setting.
  - Restart server.
  - Go to logs.  Verify.  It is waiting for requests.
- truffle compile && truffle migrate --reset
- run tests again.

# Design

## Goals

1) Correctness
Blockchain are immutable. It is hard to make changes once it is deployed.  
Hence, the focus on getting it right using interface to insulate client and server.

ProjectAdapter interface is used to insulate client from contracts as much as possible.  

2) Security
The second goal is to test and make it secure.  Private blockchain would have less security needs than public ones but nevertheless, it is still important.

Test suites and the use of modifier are used to show how I approach it.  

3) Make it cheaper
Block chain are not optimized to make it run faster but to make it run cheaper in terms of gas.  
This is not done yet.  This should be done once interface is stable and there is sufficient information on instrumentation.  

Things to consider
- move things to stack as much as possible.
- then memory
- lastly storage.
  - make storage smaller if possible.

- figure out which function are used often and make sense to optimized
  - revisit external vs public
  https://www.youtube.com/watch?v=Ii4g38mPPlg
  - consider using assembly to make it faster.

# Notes

## Merging of contracts
When I test initially in remix IDE, I have 3 contracts files.
Due to bug in truffle, I have to merge them into 1 file.

The issue is abstract contract or contract signature does not match 100%.
truffles does not handle well with abstract interface. I have declared an ProjectAdapter interface.  My concrete implementation implement the function but add an additional modifier.  

This highlight the nature of bleeding edge technologies.

Refer to closed issue:
https://github.com/trufflesuite/truffle/issues/476
and open issues:
https://github.com/trufflesuite/truffle-contract/issues/34
https://github.com/trufflesuite/truffle/issues/541

## Testing in solidity
I have started writing my test in solidity but abandon it.
Reasons:
- I can implement unit testing.
- I cannot do mocking, stubbing etc.  Nature of solidity is that we can change msg.sender to simulate error scenario for example.

Recommend not to use solidity for testing.
Also lacking in documentLocation.

## Testing in Javascript
Uses Mocha for testing and Chai for assert etc.
Can be used to implement unit testing to integration tests.

### Chain of Promises -- hell
Pervasive use of promises and chaining.  Can lead to problems.
Stick to this as it seems to be more popular.

### Explore aysnc/await
Promising to use async/await to avoid chaining of promises.  
Did not work most likely due to packages incompatibility.  Need javascript polyfill to make it work.  
Use it but compiling still failed.  Worthwhile to revisit.  

### Breaking up of test cases into 2 files.
I have to break up the tests into 2 files.  Most likely due to insufficient gas to run all the tests in one go.
Worth to revisit.  

# Next steps

## Baseline for managing moving parts.
Maturity seem to go lower as one goes from back to front.  Ethereum has more maturity, better documentation than truffle.  

Need to have base set of use cases to map out the features and toolset from front to back.
Then, one need to run test/experiments to poke it out.  This is because lack of documentation, maturity etc.  

## Go deeper in the front
truffle uses web3.js.  Legal fab uses Java so web3j seem to be the answer.  There may be difference and lag between these two.  Have to test it to know.  

Have to go deeper into the client protocol.  That is the invariant between all those different client lib.

## Go deeper in the back
To master ethereum, one has to go deeper into literally the bits and bytes.  Need to know VM, whitepaper, specs etc.
Documentation are available at each level but one need to connect the dots on your own.  

Solidity compile into opcode for VM.  VM will execute and blocks are in hex.  To figure out things, sometimes one has to decode hex.  One has to go up and down the semantic stack.  

One aspects that I tried but yet to figure it out is low level logs in VM.  I was hoping to use low level logs to improve system tracing.  Yet to figure it out.  
