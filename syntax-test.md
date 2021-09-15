# Writing styles should be Fluid

Writing style rules for your custom components should be enjoyable. Doesn't matter if you're an experienced front-end developer or not.

If you already used styled-components (or goober, or emotion, or similar) you should be able to write the styling for components using the same syntax as you're already accustomed. Just go ahead and try it.

But if you are more used to the SCSS world, prefers a less verbose syntax, or just don't like the CSS-in-JS syntaxes, there's another way: the new syntax created by the team behind Fluido UI, called FSS (or Fluid Style Sheet).

Keep reading if you want to know more about FSS, how it compares to styled-components and how to use it in your components.

Let's get started!

## Styling based on a prop

The most basic use, putting a dynamic value in a style rule (aka: using variables).

### styled-components tsx

Even in this very basic use case, we found that tsx's syntax is a bit verbose.

1. First you have to tell the template string that this is a dynamic value using `${...}`,
2. Create a function `() =>`,
3. Pass `(props)` as a parameter inside the function or _optionally_ destructure individual props `({ var1, var2 })`,
4. Only to finally pass the variable `var` or `props.var`.

```tsx
padding: ${({ p }) => p};

// or

padding: ${( props ) => props.p};
```

### FSS

Using the FSS's aproach you just pass the variable with a dolar sign `$` in front of it, like you would using sass. That's it.

```scss
padding: $p;
```

---

## Styling a prop using logical operators

When you want to style something if one or more conditions are met.

For example, do something if some property(ies) is(are) present.

Javascript is pretty straightforward with this, just use the logical operators and (`&&`), or (`||`), equal(`==`), _et cetera_.

The problem here is that it is even more verbose. You have to type every prop twice or `props.prop` a lot!

### Logical AND

If _all_ of the previous values are true, use the **last**.

```tsx
let varA = 10 > 5 // should be true
let varB = true
let varC = 'Whiskey in the Jar'
```

Consider the fictional example:

```
<!-- The code bellow **IS NOT** a real syntax -->

varA [AND] varB [AND] varC

expected output: "Whiskey in the Jar"
```

Now compare the following real syntax differences.

#### styled-components tsx

```tsx
user-select: ${({ preventSelection }) => preventSelection && 'none'};
// or
user-select: ${(props) => props.preventSelection && 'none'};

// checking multiple props

padding-inline: ${({ isFeatured, outlined }) => isFeatured && outlined && '2rem'};
// or
padding-inline: ${(props) => props.isFeatured && props.outlined && '2rem'};
```

#### FSS

In FSS we use the logical operators as special functions, passing comma separated values.

```scss
user-select: #and($preventSelection, none);

// checking multiple props

padding-inline: #and($isFeatured, $outlined, 2rem);
```

#### Using the component

Here's how it should work

Example 1:

```tsx
// Since there's no `preventSelection` prop, it evaluates as `false`.
// The `user-select: none` wont be used
<Text>I'm a selectable piece of text</Text>
```

Example 2:

```tsx
// `preventSelection` was used, so it's `true`.
// The `user-select: none` will be applied.
<Text preventSelection>You won't be able to select me</Text>
```

Example 3:

```tsx
// Has the `isFeatured` prop, but not the `outlined` prop.
// The `padding-inline: 2rem;` will NOT be applied.
<Button isFeatured>My padding should be the default</Button>
```

Example 4:

```tsx
// Has both `isFeatured` and `outlined` props.
// The `padding-inline: 2rem;` will be applied.
<Button isFeatured outlined>
  My padding should be the default
</Button>
```

> You can read it like this:
> If it has isFeatured prop, proceed, if not, fail;
> If it has outlined prop, proceed, if not, fail;
> If all of the above are true, use 2rem.

### Logical OR

Use the **first** if it's true, if not, use the _next one_…

```tsx
let varA = 5 > 10 // should be false
let varB = 'Gimme fuel, gimme fire…'
let varC = 'Gimme that which I desire!'
```

Consider the fictional example:

```
<!-- The code bellow **IS NOT** a real syntax -->

varA [OR] varB [OR] varC

expected output: "Gimme fuel, gimme fire…"
```

Now compare the following real syntax differences.

#### styled-components tsx

```tsx
border-color: ${({ borderColor }) => borderColor || 'currentColor'};

// or

border-color: ${(props) => props.borderColor || 'currentColor'};` // checking multiple props
border-color: ${({ borderColor, theme }) => borderColor || theme.borderColor || 'currentColor'};`

// or
border-color: ${(props) => props.borderColor || props.theme.borderColor || 'currentColor'};
```

#### FSS

In FSS we use the logical operators as special functions, passing comma separated values.

```scss
border-color: #or($borderColor, currentColor);

// checking multiple props

border-color: #or($borderColor, $theme.borderColor, currentColor);
```

#### Using the component

Here's how it should work

Example 1:

```tsx
// Since neither `borderColor` or `theme` props are present, use `currentColor`.
// The `border-color: currentColor;` will be applied.
<Box border color='red'>
  My border will have the same color as the text (which is red).
</Box>
```

Example 2:

```tsx
// Since `borderColor` isn't present the `theme` is applied, never reaches `currentColor`.
// The `border-color: var(--theme-border-color);` will be applied.
<Box border theme={midnightTheme}>
  Using the theme's border color!
</Box>
```

Example 3:

```tsx
// `borderColor` is present, so it never reaches the `theme`.
// The `border-color: blue;` will be applied.
<Box border borderColor='blue' theme={midnightTheme}>
  I'll have a blue border, no matter what the theme is.
</Box>
```

> You can read it like this:
> if it has borderColor, use it;
> if not, if it has theme.borderColor, use it;
> if none of the above, use currentColor.

---

## Conditionally styling multiple rules based on a prop

### styled-components tsx

```tsx
${({ border, borderColor, borderStyle }) =>
border &&
` border-color: ${borderColor || 'currentColor'} border-style: ${borderStyle || 'solid'} border-width: ${border || 'currentColor'}`}
```

### FSS

```scss
#if($border) {
  border-color: #or($borderColor, currentColor);
  border-style: #or($borderStyle, solid);
  border-width: #or($border, $borderWidth);
}
```

---

## Combining multiple props into a single rule

### styled-components tsx

```tsx
${({ hue, saturation, lightness, colorOpacity }) => `
    color: hsla(${hue}, ${saturation}, ${lightness}, ${colorOpacity});
`}
```

### FSS

```scss
color: hsla($hue, $saturation, $lightness, $colorOpacity);
```

---

## Two or more conditions

### styled-components tsx

```tsx
${({ allowOverflow, preserveRatio }) => ` ${(allowOverflow || preserveRatio) &&`
  position: absolute
`} `}
```

### FSS

```scss
#if($allowOverflow || $preserveRatio) {
  position: absolute;
}
```

---

## Dynamic selector

```ts
// stripes: 'even' | 'odd' | undefined
```

### styled-components tsx

```tsx
${({ stripes }) => stripes && `
  & > :nth-of-type(${stripes}) {
    background-color: #eee;
  }`
}
```

### FSS

```scss
#if($stripes) {
  & > :nth-of-type($stripes) {
    background-color: #eee;
  }
}
```

### styled-components tsx

```tsx
& > :nth-last-child(n + ${({ limit }) => (limit && limit + 1)}),
& > :nth-last-child(n + ${({ limit }) => (limit && limit + 1)}) ~ \* {
  flex-basis: 100%;
}
```

### FSS

```scss
& > :nth-last-child(n + #math($limit + 1)),
& > :nth-last-child(n + #math($limit + 1)) ~ \* {
  flex-basis: 100%;
}
```

## Running functions

### styled-components tsx

Using tsx syntax, you can pass functions directly inside the style rules, this is a _really_ nice behavior.
Although it can lead to long, hard to read, rules or selectors, like the example bellow:

1. First import the function

```tsx
import { makeNthChildSelector } from 'ui-utilities'
```

2. Then use it inside the style declaration

```tsx
& > :is(${({ fill }) => (fill && makeNthChildSelector(fill)) || 'a'}) {
  flex: 1;
}
```

### FSS

Using FSS is a little different, it is a bit more verbose in favor of legibility.
There are three steps, like so:

1. First import the function

```tsx
import { makeNthChildSelector } from 'ui-utilities'
```

2. Then create a new variable calling the function

```tsx
const selector = ({ fill }) => (fill && makeNthChildSelector(fill)) || 'a'
```

3. Finally use the variable in your style declaration

```scss
& > :is(${selector}) {
  flex: 1;
}
```

> Notice that javascript variables must be expressed using dolar sign `$` +
> curly braces `{}`. Here\'s a comparisson — regular variable\: `$var`\;
> javascript variable\: `${var}`.
