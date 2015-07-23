# Docs


## Load Script
#### Dependancies: jQuery ()

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

<script src="https://cdn.rawgit.com/sukritchhabra/opacityChangeOnScroll/master/opacityChangeOnScroll.js"></script>
or
<script src="http://sukritchhabra.com/opacityChangeOnScroll/opacityChangeOnScroll.js"></script>
```

## Usage

### Available Classes

#### increase-on-scroll-down
* Increase opacity of the element as you scroll down
```html
<img class="increase-on-scroll-down" src="img1.png">
```

#### decrease-on-scroll-down
* Decrease opacity of the element as you scroll down
```html
<img class="decrease-on-scroll-down" src="img1.png">
```

#### increase-decrease-on-scroll-down
* Increase First, then Decrease opacity of the element as you scroll down
```html
<img class="increase-decrease-on-scroll-down" src="img1.png">
```

### Data-Attributes

#### data-start
Start changing opacity of the element when it's offset by `x% of the windows height` from the *__bottom__* of the window 
```html
<img class="increase-on-scroll-down" data-start="20" src="img1.png">
```
* Start changing opacity of the element when it is at an offset of  `20% of the windows height` from the *__bottom__* of the window 

#### data-end
Stop changing opacity of the element when it's offset by `x% of the windows height` from the *__top__* of the window 
```html
<img class="increase-on-scroll-down" data-end="50" src="img1.png">
```
* Start changing opacity of the element when it is at an offset of  `50% of the windows height` from the *__top__* of the window 

#### Use Together
Start changing opacity of the element when it's offset by `x% of the windows height` from the *__bottom__* of the window and Stop changing opacity of the element when it's offset by `y% of the windows height` from the *__top__* of the window 
```html
<img class="increase-on-scroll-down" data-start="30" data-end="20" src="img1.png">
```
* Start changing opacity of the element when it's offset by `30% of the windows height` from the *__bottom__* of the window and Stop changing opacity of the element when it's offset by `20% of the windows height` from the *__top__* of the window