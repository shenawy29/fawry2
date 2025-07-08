# Fawry Rise Internship Task #2

This is my solution for the second Fawry Rise Internship Task.
It is written in TypeScript, same as the first task.
Ensure you have at least Node 18 in order to run this program correctly.

Clone the Repo: 

```bash
git clone https://github.com/shenawy29/fawry2.git
cd fawry2
```

Download dependencies:

```bash
npm install
```

Run the test suite (tests/bookstore.test.ts):

``` bash
npm run test
```

Output: 
```
❯ npm run test

> fawry2@1.0.0 test
> tsx --test

Sending Land of Zicola to Cairo.

Sending Amareta to foo@fawry.com.

Sending It Happens At Night In A Closed Room to Port Said.

▶ BookStore test suite
✔ can add books (1.664864ms)
✔ can buy physical books (0.937285ms)
✔ can buy digital books (0.296241ms)
✔ can't buy demo books (0.470101ms)
✔ can't buy out of stock books (0.338952ms)
✔ removes outdated books (0.300189ms)
✔ returns correct paid amount (0.246106ms)
✔ BookStore test suite (5.196262ms)
ℹ tests 7
ℹ suites 1
ℹ pass 7
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 172.974204
```

Run the example main file (src/index.ts):

``` bash
npm run start
```

Output: 
```
> fawry2@1.0.0 start
> tsx src/index.ts

Sending Land of Zicola to Building B143, 2nd Floor Smart Village.
```
