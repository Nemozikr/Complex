# Complex

Complex is a language that allows you to feel, observe, and manipulate the **event loop** directly.



## Purpose
This language was designed with control, visible flow and exploration in mind. It is best suited for logic-heavy tasks such as game logic, and is also planned to gain additional capabilities in backend development.


## Keywords

| Keyword/Function | Description |
|:-----|:------|
| `zone {}`| Starts a special loop block where the keywords below become active. |
| `merge`| Commits local changes made inside the zone to the global state and continues execution. |
| `skip` | Restarts the zone from the beginning, discarding uncommitted changes. |
| `mergeskip` | Commits local changes and restarts the zone from the beginning. |
| `trace` | Outputs/logs a value immediately. |
| `trace.template()` | Logs a template string each time a referenced variable changes. Useful for observing state over time. |

## Unique Behaviour
Zones do not automatically apply their internal changes to the global state. You must use merge or mergeskip to explicitly commit those changes. Otherwise, loops may repeat indefinitely without progress.

### Infinite Loop of Zone
```js
let int a = 0;

zone {
  merge // nothing to commit
  a++
  if (a <= 10) {
    skip;  // Discards a++, because it wasn’t committed
  }

}
```


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
}
trace(a) // Logs 11 — loop committed all increments before condition failed
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
  }
  

} // Without 'skip', the zone exits after one iteration because it doesn't loop automatically.

```

## Installation

This language is not yet installable, it is currently Work In Progress and reached Tokeniser stage.

Stay tuned for any updates to this long-term project!

Tokeniser: WIP...

Parser: Soon™
