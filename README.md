# Complex

Complex is a language that allows you to feel, see and manipulate the **event loop**.

## Purpose
This language was designed with control, visible flow and exploration in mind. It fits most to logic and game logic, but is also planned to gain additional capabilities in backend.


## Keywords

| Keyword/Function | Description |
|:-----|:------|
| `zone {}`| `zone` initiates a special loop in the brackets which allows the usage of keywords listed below. |
| `merge`| `merge` commits the changes that occurred inside of a `zone`, continues with the flow. |
| `skip` | `skip` will return the program flow back to the start of the zone, while dropping all changes. |
| `mergeskip` | `mergeskip` combined the effect of both, commits local changes into global state, starts from the beginning of the zone. |
| `trace` | `trace` while used as `trace()` would output/log the data inside. |

## Syntax

### Basic Counter
The simplest counter, the zone will loop until a reaches 10.

```js
let int a = 0;
zone {
  if (a <= 10)  { //The condition is to increment a, until it reaches a = 11 or more.
    a++;

    mergeskip; // Commits a to global state
  }
};
trace(a) // will log 11, as it skips committing upon reaching a = 11
```

This example shows the simplest way that loops using zone functionality can be implemented. While showing the static typing yet enforcing semi-colons.


### A more advanced example: a battle loop.

```js
let int playerHP = 100;
const int playerDMG = 10;

let int enemyHP = 50;
const int enemyDMG = 10;

let int round = 0;
trace.template(`Round ${round}!`) // This `trace` keyword will log this template everytime the variable changes.
zone {
  round++; // output: Round 1!... Round n!
  if (round % 2 == 1) {
    enemyHP -= playerDMG;
  } else {
    playerHP -= enemyDMG;
  }
  merge;
  if (playerHP <= 0) trace("Player Lost...")
  else if (enemyHP <= 0) trace("Enemy perished!")
  else {
    skip;
  };
  

} // if skip was not used, the zone would simply leave, since it doesn't check for conditions which would require to stay within zone loop

```

## Installation

This language is not yet installable, it is currently Work In Progress and reached Tokeniser stage.

Stay tuned for any updates to this long-term project!

Tokeniser: WIP...
Parser: Soon™
