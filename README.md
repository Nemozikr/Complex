# Complex

Complex is a language that allows you to feel, see and manipulate the **event loop**.


## Keywords

| Left | Right |
|:-----|------:|
| `zone {}`| `zone` initiates a special loop in the brackets which allows the usage of keywords listed below. |
| `merge`| `merge` commits the changes that occured inside of a `zone`, continues with the flow. |
| `skip` | `skip` will return the program flow back to the start of the zone, while dropping all changes. |
| `mergeskip` | `mergeskip` combined the effect of both, commits local changes into global state, starts from the beginning of the zone. |

## Syntax

The simplest counter, the zone will loop until a reaches 10.
```
let int a = 0;
zone {
  if (a <= 10) mergeskip; // This keeps looping until a is 10 or abov
}
```

This example shows the simplest way that loops using zone functionality can be implemented. While showing the static typing yet enforcing semi-colons.
