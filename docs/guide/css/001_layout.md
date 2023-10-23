## css中的布局

### 固定宽度的三栏布局demo

- 基于html语义标签
  -header
  -nav
  -section
  - main/article
  - aside
  - footer

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>layout</title>
  </head>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    #wrapper {
      width: 960px;
      margin: 0 auto;
      border: 1px solid;
    }
    header {
      background: #f00;
    }
    header h1 {
      font-family: 'Droid Sans';
      font-weight: 400;
      font-size: 4em;
      letter-spacing: -0.05em;
      color: #fff;
      padding: 0 0 5px 10px;
    }
    nav {
      width: 150px;
      float: left;
      box-sizing: border-box;
    }
    nav li {
      /*去掉列表项目符号*/
      list-style-type: none;
    }
    article {
      box-sizing: border-box;
      width: 600px;
      float: left;
      background: #ffed53;
      padding: 10px 20px;
    }
    article .inner{
      margin: 20px;
      padding: 20px;
      border: 2px solid red;

    }
    aside {
      box-sizing: border-box;
      width: 210px;
      float: left;
      background: #3f7ccf;
    }
    footer {
      background: #000;
      clear: both;
      text-align: center;
    }
    footer p {
      font-family: 'Open Sans';
      font-weight: 700;
      font-size: 0.65em;
      color: #fff;
    }
    footer a {
      font-family: 'Open Sans';
      font-weight: 700italic;
      font-size: 1em;
      color: #ffed53;
      text-decoration: none;
    }
  </style>
  <body>
    <div id="wrapper">
      <header>
        <h1>A Fixed-Width Layout</h1>
      </header>
      <nav>
        <div class="inner">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </div>
      </nav>
      <article>
        <div class="inner">
        <h1>Single-Column Layout</h1>
        <p>Lore ipsum ..quis</p>
        <h2>this is a Second-Level Heading</h2>
        <p>More lorem ipsum ..</p>
      </article>
      </div>
      <aside>
        <div class="inner">
        <h3>this is aside bar</h3>
        <p>Integ ...it</p>
      </aside>
      </div>
      <footer>
        <p>AnythingToContent Copyright@2023</p>
      </footer>
    </div>
  </body>
</html>


```

1. [CSS布局介绍](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Introduction)