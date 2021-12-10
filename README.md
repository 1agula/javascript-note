## スコープ



### スコープとは

実行中のコードから値と式が参照できる範囲

<font color = "red">５種類のスコープが存在する</font>
グローバルスコープ
スクリプトスコープ
関数スコープ
ブロックスコープ
モジュールスコープ



### グローバルスコープとスクリプトスコープ

Windowオブジェクト＝グローバルスコープ

<font color="deepSkyBlue">一般的にはスクリプトスコープもグローバルスコープと呼ばれる。</font>

```javascript
let a = 0;
var b = 0;
function c() {}
debugger;
```



###  関数スコープとブロックスコープ

``` javascript
{
    var a = a;
    const b = b;
    const c = function() {
        console.log('c is called')
    }
}

console.log(a);
console.log(b); //b is not defined
c(); //c is not defined
```



### スコープと実行コンテキスト

実行コンテキスト：コードが実行される状況

スコープ：実行中のコードから見える範囲

![mpv-shot10001 (1)](/home/yyn/Pictures/mpv/mpv-shot10001 (1).jpg)

![mpv-shot0002 (1)](/home/yyn/Pictures/mpv/mpv-shot0002 (1).jpg)



### レキシカルスコープ

プログラムの文脈ではソースコードのどこに何を書いてるかという意味。

コードを書く場所によって参照できる変数が変わるスコープのこと。
コードを記述した時点で決定するため「静的スコープ」とも言う。

①実行中のコードから見た外部スコープのこと。
②どのようにしてスコープを決定するかの仕様のこと。

```javascript
let a = 2;
function fn1() {
    let b = 1;
    function fn2() {
        let c = 3;
        console.log(b);
    }
    fn2();
}
fn1();

```

グローバルスコープ 
a, fn1
	関数スコープ(fn1)
	b, fn2
		関数スコープ(fn2)
		c

### スコープチェーン

スコープが複数階層で、連なってる状態。

![mpv-shot0002 (2)](/home/yyn/Pictures/mpv/mpv-shot0002 (2).jpg)



### クロージャー（プライベート変数）

```javascript
function incrementFactory(){
    let num = 0;
    function increment(){
        num = num +1;
        console.log(num);
    }
    return increment;
}
const increment = incrementFactory();
increment();
increment();
increment();
```



### クロージャー（動的関数の生成）

```javascript
function addNumberFactory(num){
    function addNumber(value){
        return num + value;
    }
    return addNumber;
}

const add5 = addNumberFactory(5);
const add10 = addNumberFactory(10);
let result = add5(10);
console.log(result);
```

### クロージャー（即時関数）

``` javascript
let a = (function() {
    let privateValue = 0;
    let publicValue = 10;
    function privateFn() {
        console.log('private function is called');
    }
    function publicFn() {
        console.log('public function is called ' + privateValue++);
    }
    return {
        publicValue,
        publicFn
    }
})();
a.publicFn();
a.publicFn();
a.publicFn();
a.publicFn();
console.log(a.publicValue);
```



***



## 変数



### 変数宣言を行うキーワード

<font color="DeepSkyBlue">let (ES6~)</font>

<font color="DeepSkyBlue">const (ES6~)</font>

<font color = "DarkGrey">var (非推奨)</font>

- 宣言による機能の違い

| タイプ | 再宣言 | 再代入 | スコープ |  初期化   |
| :----: | :----: | :----: | :------: | :-------: |
|  let   |   ✗    |   ○    | ブロック |     ✗     |
| const  |   ✗    |   ✗    | ブロック |     ✗     |
|  var   |   ○    |   ○    |   関数   | undefined |



### データ型

|      型      |   英文    |      例       |
| :----------: | :-------: | :-----------: |
|    真偽値    |  Boolean  |  true/false   |
|     数値     |  Number   |      12       |
|    文字列    |  String   |    "Hello"    |
|  undefined   | Undefined |   undefined   |
|     null     |   Null    |     null      |
|   シンボル   |  Symbol   |   一意の値    |
|    BigInt    |  BigInt   |      12n      |
| オブジェクト |  object   | {a : 'value'} |



### 暗黙的な型変換

変数が呼ばれた状況によって<font color = "red">変数の型が自動的に変換</font>されること。

### falsy と truthy

falsyな値

​	booleanで真偽値に変換した場合にfalseになる値の事。

| falsy                            | truthy   |
| -------------------------------- | -------- |
| false,null,0,undefined,0n,NaN,"" | それ以外 |



### AND条件とOR条件

```javascript
const a = 0;
const b = 2;
const c = 3;
const d = 0;
console.log(a && b);
//0
console.log(a || b);
//2
console.log(a || b && c);
//3
console.log((a || b) && (c || d));
//3
```

- 応用

```javascript
function hello(name) {
    name = name || 'Tom';
    console.log('Hello' + name);
}
hello('Bob');
hello('');

let name = 'jack';
//if (name) {
//    hello(name);
//}
name && hello(name);
```

```javascript
//デフォルト引数
function hello(name = 'Tom') {
    //name = name || 'Tom';
    console.log('Hello' + name);
}
hello('Bob');
hello('');
```



### プリミティブ型とオブジェクト

| プリミティブ型                                               | オブジェクト                                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| String      Null<br />Number  Symbol<br />Boolean  BigInt<br />Undefined | Object                                                       |
| 変数には<font color = "red">値</font>が格納される。<br />一度作成するとその値を変更することはできない。<br /><font color = "red">immutable</font> | 変数には<font color = "red">参照</font>が格納される。<br />値を変更することができる。<br /><font color = "red">mutable</font><br />名前付きの<font color = "red">参照</font>を管理する入れ物 |





### 参照とコピー



![mpv-shot0001](/home/yyn/Pictures/mpv/mpv-shot0001.jpg)

![mpv-shot0002](/home/yyn/Pictures/mpv/mpv-shot0002.jpg)

![mpv-shot0003](/home/yyn/Pictures/mpv/mpv-shot0003.jpg)



```javascript
let a = 'this is a string';
let b = a.slice(10, 16);
console.log(a);//'this is a string'
console.log(b);//'string'
```

``` javascript
let a = {
	b: 3
}; // mutable
a.b = 4;
a; // {b: 4}
```

```javascript
let a = 3; // immutable
typeof a; // number

let b = new Number(4); // mutable
typeof b; // object
```



### 参照とconst

![mpv-shot0004](/home/yyn/Pictures/mpv/mpv-shot0004.jpg)

![mpv-shot0005](/home/yyn/Pictures/mpv/mpv-shot0005.jpg)



### 参照と引数

``` javascript
let a = 0;
function fn1(arg1) {
    arg1 = 1;
    console.log(a,arg1);
}

fn1(a); // 0 1
```

``` javascript
let b = {
    prop: 0
}

function fn2(arg2){
    arg2.prop = 1;
    console.log(b,arg2);
}

fn2(b);
//{prop: 1}
//{prop: 1}
```

```javascript
function fn3(arg2){
    arg2 = {};
    console.log(b,arg2);
}

fn3(b); //{prop: 1} {}
```



### 参照と分割代入

```javascript
let {a,b} = object;
```

オブジェクトから特定のプロパティーを抽出して宣言を行う。

![mpv-shot0006](/home/yyn/Pictures/mpv/mpv-shot0006.jpg)

```javascript
const a ={
    prop:0
}

let {prop} = a; //let {prop:b} = a;

prop = 1;

console.log(a,prop); //console.log(a,b);

function fn({prop}) {
    prop = 1;
    console.log(a, prop);
}

fn(a); 
//{prop: 0} 1
```

```javascript
const c = {
    prop1: {
        prop2: 0
    }
}

let { prop1 } = c;

prop1.prop2 = 1;

console.log(c,prop1);
//{prop1: {…}}{prop2: 1}
```



### 参照の比較と値の比較

- プリミティブ型では<font color = "red">値</font>の比較。
- オブジェクトは<font color = "deepSkyBlue">参照</font>の比較。

```javascript
const a = {
    prop : 0
}

const a = {
    prop : 0
}

console.log(a === b); //false
console.log(a.prop === b.prop); //true

const c = a;
console.log (a === c); //true
```



***



## 関数とオブジェクト



### 関数

``` javascript
function fn(...args) {
    console.log(args);
    const a = arguments[0];
    const b = arguments[1];
    console.log(arguments);
    console.log(a,b);
    return a;
}

let c = fn (1,undefined,0);
console.log(c);
```



###　関数とオブジェクト

- <font color = "red">関数</font>は<font color = "red">実行可能なオブジェクト</font>である。

``` javascript
function a() {
    console.log('hello');
}

a.prop = 0;
a.method = function() {
    console.log('method');
}

a();
a.method();
console.log(a.prop);
```



###　コールバック関数

- 他の関数に<font color = 'red'>引数として</font>渡される関数。

```javascript
function hello(name) {
    console.log('hello ' + name);
}

function bye() {
    console.log('bye');
}

function fn(cb) {
    cb('Tom');
}

fn(hello); //hello Tom
fn(bye); //bye

fn(
);

setTimeout(hello,2000);

```



### this

- <font color = "red">呼び出し元のオブジェクト</font>への参照を保持するキーワード。

``` javascript
const person = {
    name = 'Tom',
    hello:function () {
        console.log( 'Hello ' + this.name)
    }
}

person.hello(); //Hello Tom
```

- 実行コンテキストよって`this`の参照先は変わる。
- <font color = "red"> 呼び出し元のオブジェクト</font>への参照を保持する。



### 参照のコピーとthis

```javascript
const person = {
    name : 'Tom',
    hello:function () {
        console.log( 'Hello ' + this.name)
    }
}

const ref = person.hello;
let name = 'John';
ref(); //Hello John
```

<font color = "deepSkyBlue"> オブジェクトのメソッド</font>

として実行される場合

`this`  =>　<font color = "deepSkyBlue"> 呼び出し元オブジェクト</font>

<font color = "red"> 関数</font>

として実行される場合

`this` => <font color = "red"> グローバルオブジェクト</font>



### コールバック関数とthis

``` javascript
window.name = 'John';

const person = {
    name: 'Tom',
    hello: function () {
        console.log('Hello ' + this.name);
    }
}

person.hello(); //Hello Tom

function fn(ref) {
    ref();
}

fn(person.hello); //Hello John
//メソッドを他の変数に代入してることと同じ　
```



### bindとthis

- `bind`によって<font color = "red">this</font>や<font color = "red">引数</font>を固定した新しい関数を作成。

```javascript
window.name = 'John';

const person = {
    name: 'Tom',
    hello: function () {
        console.log('Hello ' + this.name);
    }
}

person.hello(); //Hello Tom

const helloTom = person.hello.bind(person);

function fn(ref) {
    ref();
}

fn(helloTom); //Hello Tom 
```

```javascript
function a(name) {
    console.log('hello' + name);
}

const b = a.bind(null, 'Tim');

b();
```

![mpv-shot0007](/home/yyn/Pictures/mpv/mpv-shot0007.jpg)



### call, applyとthis

- <font color = "deepSkyBlue"> bind</font>

  `this`や引数の参照先を変更。

  使用時点で<font color = "red"> 実行をしない。</font>

- <font color = "deepSkyBlue"> call, apply</font>

  `this`や引数の参照先を変更。

  使用時点で<font color = "red"> 実行する。</font>

``` javascript
function a(name) {
    console.log('hello ' + this.name);
}

const tim = {name: 'Tim'};

const b = a.bind(tim);

b(); //hello Tim
a.apply(tim); //hello Tim
a.call(tim); //hello Tim
```

``` javascript
const arry = [1,2,3,4,5];

function a() {
    console.log('hello ' + this.name);
}

const tim = {name: 'Tim'};

const b = a.bind(tim);

b(); //hello Tim
a.apply(tim); //hello Tim
a.call(tim); //hello Tim

const result = Math.max.apply(null,arry);
//const result = Math.max(...arry);
console.log(result); //5
```



### アロー関数

- 無名関数を記述しやすした省略記法。

  <font color = "deepSkyBlue"> ( ) => { };</font>

```javascript
function a(name) {
    return 'hello ' + name;
}

const b = function(name) {
    return 'hello ' + name;
}

const c = name => 'hello ' + name;
//const c = (name, name1) => 'hello ' + name + '' + name1;
//const c = () => 'hello';

//const c = () => {
//return 'hello';
//}

console.log(b('tom')); // hello tom
```



|           | 無名関数                      | アロー関数                    |
| --------- | ----------------------------- | ----------------------------- |
| this      | <font color = "red"> ○</font> | <font color = "red"> ✗</font> |
| argument  | ○                             | ✗                             |
| new       | ○                             | ✗                             |
| prototype | ○                             | ✗                             |



### アロー関数とthis

```javascript
window.name = 'john'

const person = {
    name: 'Tom',
    hello: () => {
        console.log('Hello ' +this.name);
        const a = () => console.log('Bye ' + this.name);
        a();
    }
}

person.hello(); 
//Hello John
//Bye John
```

```javascript
window.name = 'john'

const person = {
    name: 'Tom',
    hello() {
        console.log('Hello ' +this.name);
        const a = () => console.log('Bye ' + this.name);
        a();
    }
}

person.hello(); 
//Hello John
//Bye Tom
```



### コンストラクター関数

- 新しく<font color = "red"> オブジェクトを作成する</font>ための雛形となる関数

- 重要なキーワード

  コンストラクター関数

  インスタンス化

  インスタンス

  ```javascript
  function A() {
      this.prop = 0;
  }
  
  const obj = new A();
  ```

  `new`で作成したオブジェクトを「<font color = "red"> インスタンス</font>」という。

  `new`でオブジェクトを作成することを「<font color = "red"> インスタンス化</font>」という。

```javascript
//普通の関数とコンストラクタ関数を明確に区別するために一般的には一番最初の文字を大文字にする
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const bob = new Person('Bob', 18);
const tom = new Person('Tom', 33);
const sun = new Person('Sun', 20);
```



### プロトタイプ

- オブジェクトに存在する特別なプロパティー

- コンストラクタ関数と合わせて使用

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.prototype.hello = function() {
	console.log('hello ' + this.name);
}
}

//Person.prototype.hello = function() {
//	console.log('hello ' + this.name);
//}

const bob = new Person('Bob', 18);
const tom = new Person('Tom', 33);
const sun = new Person('Sun', 20);

bob.hello();//hello Bob
tom.hello();//hello Tom
```

![mpv-shot0008](/home/yyn/Pictures/mpv/mpv-shot0008.jpg)

![mpv-shot0009](/home/yyn/Pictures/mpv/mpv-shot0009.jpg)

インスタンス化した際には  <font color = "deepSkyBlue"> prototype</font>の参照が  <font color = "red"> _proto__</font>にコピーされる。

### new 演算子　(New Operator)

- コンストラクター関数からインスタンスを作成するために使用する演算子。

``` javascript
function F(a,b) {
    this.a = a;
    this b = b;
    return {};
}

const instance = new F(1,2);
console.log(instance); //{}
```

```javascript
function F(a,b) {
    this.a = a;
    this b = b;
    return 1;
}

const instance = new F(1,2);
console.log(instance); // F {a: 1, b: 2}
```

```javascript
function F(a,b) {
    this.a = a;
    this.b = b;
    return {};
}

F.prototype.c = function() {}

function newOpe(C, ...args) {
    const _this = Object.create(C.prototype);
    const result = C.apply(_this, args);
    //console.log(result, _this);
    if(typeof result === "object" && result !== null) {
        return result;
    }
    return _this;
    
}

const instance = newOpe(F, 1, 2);
console.log(instance);
```



### instanceof

- どのコンストラクターから生成されたオブジェクトかを確認する。

```javascript
function fn(arg) {
    if(arg instanceof Array) {
        arg.push('value');
    } else {
        arg['key'] = 'value';
    }
    console.log(arg)
}

fn([]);
```



### 関数コンストラクター

```javascript
const fn1 = new Function('a', 'b', 'return a + b');

const result = fn1(1, 2);

console.log(result); //3

function fn2(a,b){
    return a + b;
}

console.log(fn2 instanceof Function); //true	
```

``` javascript
const obj = new function() {
    this.a = 0;
}

const fn3 = new Function('this.a = 0;');
const obj3 = new fn3();
console.log(obj,obj3);
```



### プロトタイプチェーン

プロトタイプの<font color = "red">多重形成</font>をプロトタイプチェーンと言う。

``` javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

//Person.prototype.hello = function() {
//    console.log('Person: hello ' + this.name);
//}

Object.prototype.hello = function() {
    console.log('Object: hello ' + this.name);
}

    const bob = new Person('Bob', 18);
bob.hello();//Object: hello Bob
```

![mpv-shot0010](/home/yyn/Pictures/mpv/mpv-shot0010.jpg)



### hasOwnPropertyとin

``` javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.hello = function() {
    console.log('Person: hello ' + this.name);
}

const bob = new Person('Bob', 18);
const result = bob.hasOwnProperty('hello')
console.log(result); //false
console.log('name' in bob); //true
console.log('hello' in bob); //true

```

- `hasOwnProperty`の場合は自分自身のプロパティとして存在するか確認することができる

- `in`を使った場合にはプロトタイプチェーンまで含めて指定されてる名前のメソッドなどが存在するかを確認することができる



### プロトタイプ継承

別のコンストラクター関数の<font color = "red">プロトタイプを受け継いで</font>、機能を流用できるようにすること。

- 継承

  別のコンストラクター関数を受け継ぐこと。

``` javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.hello = function() {
    console.log('hello ' + this.name);
}

function Japanese(name, age, gender) {
    Person.call(this, name, age);
    this.gender = gender;
}

Japanese.prototype = Object.create(Person.prototype); //

Japanese.prototype.bye = function() {
    console.log('sayonara ' + this.name);
}

Japanese.prototype.hello = function() {
    console.log('konnichiwa ' + this.name);
}

const taro = new Japanese('Taro', 23, 'Male');
console.log(taro);
taro.hello();
```



### クラス

コンストラクター関数をクラス表記で書けるようにしたもの。

すでにある機能を簡単に書けるようにしたものを<font color = "red"> シンタックスシュガー</font>と表現する。

``` javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    hello() {
        console.log('hello ' + this.name);
    }
}

const bob = new Person('Bob', 23);
console.log(bob);

//function Person(name, age) {
//    this.name = name;
//    this.age = age;
//}

//Person.prototype.hello = function() {
//    console.log('hello ' + this.name);
//}

```



### クラス継承

他のクラスのプロパティーとメソッドを継承すること。

```javascript
class Person {
    constructor{
        this.name = name;
        this.age = age;
    }
	hello() {
        console.log('konnichiwa '+ this.name);
    }
	bye() {
        console.log('sayonara '+ this.name);
    }
}

class Japanese extends Person {
    constructor(name, age, gender){
        super(name, age);
        this.gender = gender
    }
}

const taro = new Japanese('Taro', 23, 'Male');
console.log(taro);
```



### super

継承元の関数を呼び出すためのキーワード。

```javascript
const american = {
    bye() {
        console.log('bye ' + this.name);
    }
}

const bob = {
    name: 'Bob',
    hello() {
		super.bye();
        console.log('hello ' + this.name);
    }
}

Object.setPrototypeOf(bob, american);
bob.hello();
//bye Bob
//hello Bob
```



### ビルトインオブジェクト

コード実行前にJSエンジンによって<font color = "red">自動的に</font>生成されるオブジェクト。

```javascript
const arry = new Array(1,2,3,4);
console.log(arry) //[1,2,3,4]

arry["0"]
arry.hasOwnProperty(0);
```



### ラッパーオブジェクト (Wrapper Object)

<font color = "deepSkyBlue">プリミティブ値</font>を内包するオブジェクト

```javascript
const a = 'hello';
console.log(a); //HELLO
//const a = new String('hello');
//console.log(a.toUpperCase()); //HELLO

const b = 100.toExponential;
console.log(b); //1e+2
//const b = new Number(100);
//console.log(b.toExponential); //1e+2
```

JavaScriptではプリミティブ型で変数が宣言された場合でメソッドにアクセスしようとすると暗黙的にラッパーオブジェクトが呼ばれます。



### Symbol

プロパティーの重複を避けるために、<font color="red">必ず一意の値</font>を返す関数。



### プロパティーとディスクリプター

![mpv-shot0011](/home/yyn/Pictures/mpv/mpv-shot0011.jpg)

プロパティーの設定値

| <font color = "deepSkyBlue">value</font>        | <font color = "red">値</font>             |
| ----------------------------------------------- | ----------------------------------------- |
| <font color = "deepSkyBlue">configurable</font> | <font color = "red">設定変更</font>可能性 |
| <font color = "deepSkyBlue">enumerable</font>   | <font color = "red">列挙</font>可能性     |
| <font color = "deepSkyBlue">writable</font>     | <font color = "red">値の変更</font>可能性 |

``` javascript
'use strict';
//const obj = {prop: 0};

const obj = {};

Object.defineProperty(obj, 'prop', {
    value:0,
    //writable: true,
	//configurable: true
})
//デフォルト値false

obj.prop = 1;
console.log(obj.prop);//エラー
delete obj.prop; //エラー

const descriptor = Object.getOwnPropertyDescriptor();

console.log(descriptor); //デフォルト値true
```



### getter_setterとstatic

### ![mpv-shot0012](/home/yyn/Pictures/mpv/mpv-shot0012.jpg)

```javascript
function Person1(name, age){
    this._name = name;
    this._age = age;
}

Person1.hello = function() {
    console.log('hello');
}
//staticメソッド
Person1.hello();

Object.defineProperty(Person1.prototype, 'name', {
    get: function() {
        console.log('Hello')
        return this._name;
    },
    
    set: function(val){
        this._name = val;
    }
});

const p1 = new Person1('Bob', 23);

p1.name = 'Tom';
console.log(p1.name);
```

``` javascript
class Person2 {
    constructor(name, age){
        this._name = name;
        this._age = age;
    }
    
    get name() {
        console.log('Hello')
        return this._name;
    }
    
    set name(val){
        this._name = val;
    }
    
    static hello() {
        console.log('hello!')
    }
}

const p2 = new Person2('Bob', 23);
Person2.hello();
```

static クラス内で使用できる静的なメソッドを定義する場合のキーワード

インスタンスを行わずに使用できるメソッドのことを静的メソッド（スタティックメソッド）



### チェーンメソッド

``` javascript
class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	hello(person) {
		console.log(`${this.name} says hello ${person.name}`);
		return this;
	}

	introduce() {
		console.log(`Hi, I'm ${this.name}, ${this.age} years old.`);
		return this;
	}

	shakeHands(person) {
		console.log(`${this.name} shake hands with ${person.name}.`);
		return this;
	}

	bye(person) {
		console.log(`Goodbye, ${person.name}.`);
		return this;
	}
}

const bob = new Person('Bob', 23);
const tim = new Person('Tim', 33);

bob.hello(tim)
	.introduce()
	.shakeHands(tim)
	.bye(tim);
```



***

## 反復処理



### ループ文

``` javascript
for(let i = 0; i < 10; i++) {
    console.log(i);
}

let i = 0;
while(i < 10) {
    console.log(i);
    i++;
}
```



### 演算子と優先順位

- 演算子(Operator)

  値（オペランド）を元に処理を行い、<font color = "red">結果を返す</font>記号。
  
  

### ループ文とブロックスコープ

```javascript
for(let i = 0; i < 5; i++) {
    const j = i * 2;
    setTimeout(function() {
        console.log(j);
    },1000); 
}
```



### 配列とループ文

``` javascript
const arry = [1, 2, 3, 4, 5];

for(let i = 0; i < arry.length; i++) {
    console.log(arry[i]);
}

let v, i = 0;
while(v = arry[i++]) {
    console.log(v);
}
```



### for...inと列挙可能性

- for...in

  <font color = "red">列挙可能プロパティー</font>に対して順不同で反復処理を実行する。

  プロトタイプチェーン内も列挙対象となる。

  Symbolで定義したプロパティーはfor...inで列挙対象にならない。

``` javascript
const = Symbol();
const obj = {
    prop1: 'value1',
    prop2: 'value2',
	prop3: 'value3',
    [s]: 'value4'
}

Object.prototype.method = function(){}
//Object.defineProperty(Object.prototype, 'method', {
//    enumerable: false
//});

for(let key in obj) {
    if(obj.hasOwnProperty(key)){
     console.log(key, obj[key]);
    }
}
```



### for...ofと反復可能性

- for...of

  <font color = "red">イテレーター</font>を持つオブジェクトの反復操作を行う。

- イテレーター (Iterator)

  反復操作を行う際に使用するオブジェクト

  <font color = "red">反復可能オブジェクト</font>(String, Array, Map, Set, arguments,etc...)

``` javascript
const arry = ['a', 'b', 'c'];

arry[4] = 'e';

Object.prototype.method = function() {}

for(let v of arry){
    console.log(v);
}
```



### MapとSet

- Map, Set

  データを管理する入れ物。  =>　<font color = "red">コレクション</font>

|          | Object |   Map    |
| :------: | :----: | :------: |
|   キー   | 文字列 | 制御なし |
| for...in |   ○    |    ✗     |
| for...of |   ✗    |    ○     |

|          | Array | Set  |
| :------: | :---: | :--: |
|  重複値  |   ○   |  ✗   |
| for...in |   ○   |  ✗   |
| for...of |   ○   |  ○   |

```javascript
const map = new Map();

const key1 = {};
map.set(key1,'value1');
console.log(map.get(key1));

const key2 = function() {}
map.set(key2, 'value2');
console.log(map.get(key2));

let key3;
map.set(key3 = 0, 'value3');
console.log(map.get(0));

map.delete(key3);
console.log(map.get(0));

for(const [k, v] of map){
    console.log(k);
}

const s = new Set();
s.add(key1);
s.add(key1);
s.add(key2);
s.add(key3);
s.delete(key3);
s.has(key3);

//const arry = Array.from(s); //const arry = [...s];
//console.log(arry);

for(let k of s){
    console.log(k);
}
```



### イテレーター

反復操作を行う際に使用するオブジェクト。 => <font color ="deepSkyBlue">決められたルールに 則って記述</font>

``` javascript
function genIterator() {
    return {
        next: function() {
            return {
                done: true / false,
                value:'値'
            }
        }
    }
}
```

```javascript
function genIterator(max = 10) {
  let i = 0;

  return {
    next: function() {
      if(i >= max) {
        return {
          done: true
        }
      } else {
        return {
          done: false,
          value: i++
        }
      }
    }
  }
}

const it = genIterator(10);

let a = it.next();
while(!a.done) {
  console.log(a.value);
  a = it.next();
}

const obj = {
  [Symbol.iterator]: genIterator.bind(null, 10)
}

for(const i of obj) {
  console.log(i);
}

const s = new Set(obj);
console.log(s);
```



### 反復可能オブジェクト（イテレーター）



``` javascript
const obj = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3'
}

const items = Object.entries(obj);
for (let item of items) {
    console.log(item);
}

```

```javascript
const items = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3'
}

Object.prototype[Symbol.iterator] = function() {
    const keys = Object.keys(this);
    let i = 0;
    let _this = this;
	return {
        next() {
			let key = keys[i];
            i++;
            return {
                value: [key, _this[key]],
                done: i > keys.length
            }
        }
    }
}

for (let [k, v] of items) {
    console.log(item);
}

```



### ジェネレーター

<font color = "red">イテレーター</font>を生成するための特殊な関数。 => <font color = "red">より簡略化して記述可能</font>

``` javascript
function* gen() {
    if('ループ継続'){
        yield '値';
    } else {
        return '値';
    }
}
```

```javascript
function* gen(max = 10) {
    let i  = 0;
    while(i < max){
        yield i++;
    } 
    return;
}

const it =gen();
console.log(it.next());
```



### 反復可能オブジェクト（ジェネレーター）

``` javascript
const items = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3'
}

Object.prototype[Symbol.iterator] = function() {
	for(let key in this){
        yield [key, this[key]];
    }
}

for (let [k, v] of items) {
    console.log(item);
}
```



### イテレーターとスプレッド演算子

- スプレッド演算子(Spread Operator)

  反復可能や列挙可能オブジェクトの展開を行う。

  <font color = "red">let a = [...arry]</font>

  {}, []の中で使用

- 残余引数(Rest Parameter)

  実引数に渡された変数を配列にまとめる。

  <font color = "red">function(...args)</font>

スプレッド演算子は<font color = "red">イテレーターの操作に従う</font>

``` javascript
const arry1 = [1,2,3,4,5];
const arry2 = [...arry1];

console.log(arry1 === arry2);//false

arry2.push(6);
console.log(arry1);

function sum(...args) {
    let ret = 0;
    for(let v of args){
        ret += v;
    }
    return ret;
}

const result = sum(1,2,3,4);

const obj1 = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3'
}

Object.prototype[Symbol.iterator] = function*() {
    for(let key in this){
        yield [key, this[key]];
    }
}

const arry3 = [...obj];
console.log(arry3);
```



---



## 非同期処理



### ブラウザとJavaScript

- スレッド

  連続して実行される<font color = "red">一本</font>の処理の流れ。

  <font color = "deepSkyBlue">Main Thread</font>

  Service Worker

  Web Worker

- メインスレッド

  JavaScriptの実行とレンダリング(画面描写処理)を行う。



### 同期処理と非同期処理

<font color = "deepSkyBlue">同期処理</font>では一つの処理が完了するまで次の処理には進まない。

<font color = "deepSkyBlue">同期処理</font>では<font color = "red">メインスレッド</font>でコードが順番に実行される。

``` javascript
function sleep(ms) {
    const starTime = new Date();
    while (new Date() - startTime < ms);
    console.log('sleep done')
}

const btn = document.querySelector('button');
btn.addEventListener('click', function(){
    console.log('button clicked');
});

setTimeout(function() {
    sleep(3000);
}, 2000);
```

<font color = "deepSkyBlue">非同期処理</font>は一時的に<font color = "red">メインスレッド</font>から処理が切り離される。

![mpv-shot0013](/home/yyn/Pictures/mpv/mpv-shot0013.jpg)



### タスクキューとコールスタック

- タスクキュー
  <font color = "deepSkyBlue">実行待ち</font>の非同期処理の行列。 =>　非同期処理の<font color = "red">実行順</font>を管理！

  キューの仕組みを「後入れ先出し」という。 =>FIFO(First In, First Out)

``` javascript
const btn = document.querySelector('button');
btn.addEventListener('click', function task2(){
    console.log('task2 done');
});

function a() {
    setTimeout(function task1() {
        console.log('task1 done');
    },4000);
	
    const startTime = new Date();
	while(new Date() - startTime < 5000);

	console.log('fn a done');
}

a();

```



### コールバック関数と非同期処理

```javascript
function a(){
    setTimeout(function task1(){
        console.log('task1 done');
    });
	console.log('fn a done');
}

function b() {
    console.log('fn b done');
}

a(b);
```



### 非同期処理のチェーン

```javascript
function sleep(callback, val) {
  setTimeout(function() {
    console.log(val++);
    callback(val);
  }, 1000);
}

sleep(function(val) {
  sleep(function(val) {
    sleep(function(val) {
      sleep(function(val) {
  
      }, val);
    }, val);
  }, val);
}, 0);
```



### Promise

非同期処理をより簡単に、可読性が上がるように書けるようにしたもの。

![mpv-shot0014](/home/yyn/Pictures/mpv/mpv-shot0014.jpg)

``` javascript
new Promise(function(resolve, reject) {
    console.log('promise');
    setTimeout(function() {
        resolve("hello");
    }, 1000);
}).then(function(data) {
    console.log('then: ' + data);
	//throw new Error();
    return data;
}).then(function(data) {
    console.log('then: ' + data);
    return data;
}).catch(function(data) {
    console.log('catch: ' + data);
}).finally(function() {
    console.log('finally');
})

console.log('global end');
```



### Promiseチェーン

Promiseを使って非同期処理を順次実行すること。

```javascript
function sleep(val) {
	return new Promise(function(resolve) {
        setTimeout(function() {
            console.log(val++);
            resolve(val);
  		}, 1000);
    });
}

sleep(0).then(function(val) {
    return sleep(val);
}).then(function(val) {
    return sleep(val);
}).then(function(val) {
    return sleep(val);
}).then(function(val) {
    return sleep(val);
}).then(function(val) {
    return sleep(val);
})
```



### Promiseと並列処理

```javascript
function sleep(val) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log(val++);
      reject(val);
    }, val * 500);
  });
}

Promise.allSettled([sleep(2), sleep(3), sleep(4)])
.then(function (data) {
  console.log(data);
}).catch(function(e) {
  console.error(e);
});

```



### MacrotasksとMicrotasks

- マクロタスク

  <font color = "red">タスクキュー</font>と呼んでいたもの。

- マイクロタスク

  <font color = "deepSkyBlue">タスクキュー</font>とは別で存在する非同期処理の待ち行列。 => <font color = "red">ジョブキュー</font>

```javascript
setTimeout(function task1() {
    console.log('task1');
});

new Promise(function promise(resove) {
    console.log('promise');
    resoleve();
}).then(function job1() {
    console.log('job1');
});

console.log('global end');
```

```javascript
new Promise(function promise(resove) {
    console.log('promise');
    
	setTimeout(function task1() {
		console.log('task1');
        resoleve();
    });
    
}).then(function job1() {
    console.log('job1');
	setTimeout(function task2() {
		console.log('tasl2');
    });
    
    queueMicrotask(function job4() {
        console.log('job4')
    })
}).then(function job2() {
    console.log('job2');
}).then(function job3() {
    console.log('job3');
});

console.log('global end');
```

``` javascript
const p = Promise.resolve();
p.then(function job4() {
    console.log('job4');
});
```



### AwaitとAsync

- Await/Async

  Promiseを更に直感的に記述できるようにしたもの。

- Async

  <font color = "red">Promise</font>を返却する関数の宣言を行う。

- Await

  <font color = "red">Promiseを返却する関数</font>の非同期処理が完了するまで待つ。

``` javascript
function sleep(val) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      console.log(val++);
      resolve(val);
    }, 1000);
  });
}

async function init() {
  let val = await sleep(0);
  val = await sleep(val);
  val = await sleep(val);
  val = await sleep(val);
  val = await sleep(val);
  throw new Error();
  return val;
}

init().then(function(val) {
  console.log('hello' + val)
}).catch(function(e) {
  console.error(e);
});
// console.log(init())

// sleep(0).then(function(val) {
//   return sleep(val);
// }).then(function(val) {
//   return sleep(val);
// }).then(function(val) {
//   return sleep(val);
// }).then(function(val) {
//   return sleep(val);
// }).then(function(val) {
//   return sleep(val);
// })

```



### fetch

users.json

``` javascript
[
    {
        "name": "Bob",
        "age": 23
    },
    {
        "name": "Tim",
        "age": 30
    },
    {
        "name": "Sun",
        "age": 25
    }    
]
```

main.js

```javascript
fetch('users.json').then(function(response) {
    console.log(response);
    return response.json();
}).then(function(json) {
    console.log(json);
    for(const user of json){
        console.log(`I'm ${user.name}, ${user.age} years old`)
    }
})
```

```javascript
async function fetchUsers() {
    const response = await fetch('users.json');
    const json = await response.json();
    for(const user of json){
        console.log(`I'm ${user.name}, ${user.age} years old`)
    }    
}
fetchUsers();
```



###　例外処理とエラー

- 例外処理 

  エラーが発生した際に飛ぶ特別な処理。

  ```javascript
  try{
      throw new Error()
  }catch(e){
      //エラーハンドリング
  }finally{
      //終了処理
  }
  ```

  

```javascript
async function fetchUsers() {
    const response = await fetch('users.json');
    if(response.ok) {
    	const json = await response.json();        
        if(!json.length) {
            throw new Error('no data found');
        }
        return json;
    }
}

class NodataError extends Error {
    constructor(message) {
		super(message);
        this.name = 'NoDataError';
    }
}

async function init() {
    try{
        const users = await fetchUsers();
		for(const user of users){
    	console.log(`I'm ${user.name}, ${user.age} years old`)
		}  
    }catch(e){
        if(e instanceof NoDataError) {
            console.error(e);
        }else{
            console.error(e);
        }
    }finally{
        console.log(bye);
    }
    console.log(end);
}
init();
```



---



## モジュラー



### ES ModulesとCommonJS

- モジュール

  ソースコードを機能毎に分割して、メンテナンスしやすくしする仕組み。

  代表的なものに<font color = 'red'>ESM</font>と<font color = 'red'>CJS</font>が存在する。

- CommonJS(CJS)

  Node.js CommonJS

  ​	<font color= 'deepSkyBlue'>**require/export**</font>

- ES Modules(ESM)

  ECMAScript ES Module

  ​	<font color= 'deepSkyBlue'>**import/export**</font>

| <font color= 'deepSkyBlue'>ESM</font> | <font color= 'deepSkyBlue'>CJS</font> |
| :-----------------------------------: | :-----------------------------------: |
|             import/export             |            require/exports            |
|                Browser                |                Node.js                |
|                 .mjs                  |                 .cjs                  |



### importとexport

- <font color= 'deepSkyBlue'>**Import**</font>

  モジュールの読み込みに使用

- <font color= 'deepSkyBlue'>**Export**</font>

  モジュールの露出に使用

moduleA.js|

```javascript
export let publicVal = 0;
export function publicFn() {
    console.log('publicFn called: ')
}
export default 1;
```

moduleB.js

```javascript
import defaultVal, { publicVal as val, publicFn as fn} from './moduleA.js';
console.log(Val);
fn();
console.log(defaultVal);

import * as moduleA from './moduleA.js';
console.log(moduleA.default);
```



### ES Moduleと即時関数

- 即時関数

```javascript
const moduleA = (function () {
    console.log('IIFE called');

	let privateVal = 1;
	let publicVal = 10;

	function publicFn() {
        console.log('publicFn called: ' + publicVal);
    }

	function privateFn() {

    }
    
    return {
        publicFn,
        publicVal
    }
})();

const moduleB = (function ({ publicVal:val,publicFn:fn }) {
    fn();
    fn();
    fn();
    console.log(val++);
	console.log(val++);
    fn();
})(moduleA);
```

- ES Module

  moduleA.js

  ``` javascript
      console.log('ESmodule called');
  
  	let privateVal = 1;
  	export let publicVal = {prop: 10};
  
  	export function publicFn() {
          console.log('publicFn called: ' + publicVal.prop);
      }
  
  	function privateFn() {
  
      }
      
      return {
          publicFn,
          publicVal
      }
  ```

  moduleB.js

  ```javascript
  import { publicVal as val, publicFn as fn} from './moduleA.js';
  	fn();
      fn();
      fn();
      console.log(val.prop++);
  	console.log(val.prop++);
  	fn();
  ```

  

### モジュールコンテキストとモジュールスコープ

　基本的にはグローバルコンテキストとモジュールコンテキストの動きが似ているんですけど、一点だけ大きな違いとして、モジュールコンテキストの場合は` this `という値が使用することができません。

### モジュールの特徴

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script nomodule>alert('nomodule')</script>
    <script src="main.js" defer></script> //同期処理　defer 非同期処理に変換
    <script src="main.js" defer></script>　//呼ばれた回数分実行される
    <script type="module" src="moduleB.js"></script>　//非同期で読み込まれる
    <script type="module" src="moduleB.js"></script>　//自動的strictモード、何回呼ばれても一回しか実行されない
    <h1>Module Lecture</h1>
</body>

</html>
```



### strictモード

　通常のJavaScriptで許容されている<font color = 'red'>一部の書き方を制限</font>する。

- strict モードの目的

  <font color= 'deepSkyBlue'>意図しないバグの混入の防止</font>

  <font color= 'deepSkyBlue'>予約後の確保</font>

  <font color= 'deepSkyBlue'>コードのセキュア化</font>

` "use strict" ` ファイルの先頭、もしくは関数内の先頭行に記述



### Strictモードとクラス

` class`のコンストラクタやメソッドのなか自動的にstrictモードがオンになる。



### ダイナミックインポート

moduleA.js

``` javascript
	export let publicVal = {prop: 10};

	export function publicFn() {
        console.log('publicFn called');
    }

	export default 1;

```

moduleB.js

``` javascript
import('./moduleA.js').then(function(modules) {
    console.log(modules);
    modules.publicFn();
})
```

``` javascript
async function fn() {
   const modules = await import('./moduleA.js');
    modules.publicFn();
}
fn();
```



---



## 様々なオブジェクト

### Proxy

プロパティーの操作に<font color = 'red'>独自の処理を追加</font>するためのオブジェクト。

``` javascript
const targetObj = { a: 0 };
const handler = {
    set: function(target, prop, value, receiver){
        console.log(`[set]: ${prop}`);
        throw new Error('cannot add prop.'); 
        //target[prop] = value;
    },
	get: function(target, prop, receiver){
        console.log(receiver);
        if(target.hasOwnProperty(prop)){
            return target[prop];
        } else {
            return '-1';
        }
        console.log(`[get]: ${prop}`);

    },
	deleteProperty:function(target, prop){
        console.log(`[delete]: ${prop}`);
        delete target[prop]
    }
}

const pxy = new Proxy(targetObj, handler);
pxy.a;
console.log(pxy.b)
```



### Reflect

<font color = 'red'>JSエンジンの内部の汎用的な</font>関数を呼び出すメソッドが格納されているオブジェクト。

| 内部メソッド  | Reflect        |
| ------------- | -------------- |
| [[GET]]       | get            |
| [[Set]]       | set            |
| [[Delete]]    | deleteProperty |
| [[Construct]] | construct      |

①内部メソッドを呼び出す関数の格納場所。

②Proxyと合わせて使用するため。

```javascript
class C {
    constructor(a, b) {
        this.a = a;
		this.b = b;
    }
}

const obj1 = new C(1,2);
console.log(obj1)
const obj2 = Reflect.construct(C, [1,2]);
console.log(obj2);

console.log('c' in obj);
console.log(Reflect.has(obj1, 'c'));

if(Reflect.defineProperty) {
    
} else {
    
}
```

```javascript
const bob = {
    name: 'Bob',
    _hello: function () {
		console.log(`hello ${this.name}`);
    }
}

const tom = {
    name: 'Tom',
    _hello: function () {
		console.log(`hello ${this.name}`);
    },
    get hello () {
        console.log(this);
        return this._hello();
    },
}

tom.hello;
Reflect.get(tom, 'hello', bob);
```



### ReflectとProxy

| 内部メソッド  | Reflect        | Proxy          |
| ------------- | -------------- | -------------- |
| [[GET]]       | get            | get            |
| [[Set]]       | set            | set            |
| [[Delete]]    | deleteProperty | deleteProperty |
| [[Construct]] | construct      | construct      |

```javascript
const targetObj = { 
    a: 0, 
    get value() {
        return this.b;
    }
};
const handler = {
	get: function(target, prop, receiver){
		console.log(`[get]: ${prop}`);
        if(target.hasOwnProperty(prop)){
            return Reflect.get(target, prop, receiver);
        } else {
            return '-1';
        }
    }
}

const pxy = new Proxy(targetObj, handler);
console.log(pxy.value);

```



### WeakMap

弱い参照でオブジェクトを保持するコレクション

<font color = 'red'>キーは必ずオブジェクト</font>

```javascript
const wm = new WeakMap();

const o = {};
wm.set(o, 'value1');

console.log(wm.get(o));
```

### WeakMapとプライベート変数

person.js

```javascript
const wm = new WeakMap();

export class Person {
    constructor(name) {
        //this._name = name;
        wm.set(this, {
            name
        });
    }
    //インスタンス化されたオブジェクトごとにthisの参照先が変る
    hello() {
        console.log(`hello ${wm.get(this).name}`);
    }
}
```

main.js

```javascript
import { Person } from './person.js';

const tim = new Person('Tim');
const bob = new Person('Bob');
tim.hello();
bob.hello();
```



### JSON

` JSON.parse ` JSON → Object

` JSON.stringify ` Object → JSON

``` javascript
const obj = {a: 0, b: 1, c: 2};

function replacer(prop, value) {
    if(value<1) {
        return;
    }
    return value;
}
const json = JSON.stringify(obj, replacer);
console.log(json);

const obj2 = JSON.parse(json);
console.log(obj2);
```



### Storage

ブラウザの保存領域に<font color = 'red'>データを格納する</font>ためのオブジェクト→<font color = 'red'>localStorage</font>

```javascript
localStorage.setItem('key1', 'value1');
localStorage.setItem('key2', 'value2');
const result = localStorage.getItem('key1');
console.log(result);
```

``` javascript
const obj = {a: 0, b: 1, c: 2};
const json = JSON.stringify(obj);

localStorage.setItem('key', json);
const result = localStorage.getItem('key');
const obj2 = JSON.parse(result);
console.log(obj2);
```



###  Array

``` javascript
const arry = [1, 2, 3, 4, 5];
arry.push(6); //一番最後に値を追加
arry.pop(); //一番最後の値を削除
arry.shift(); //一番先頭の値を削除
arry.unshift(0);　//一番先頭に値を追加
arry.slice(0, 1); //指定した長さの分を切り取ることができる
const arry2 = arry.concat([6,7,8]);//配列を結合　
const arry3 = [0, ...arry,6,7,8];//配列を結合　
```

```javascript
const arry = [1, 2, 3, 4, 5];
arry.forEach(function(v, i, arry) {
	console.log(v);
});

const newArry = arry.map(function(v, i, arry) {
    return v*2;
});

console.log(newArry);

consr filterArry = arry.filter(function(v, i, arry) {
    return i >= 1;
});
console.log(filterArry);
```

```javascript
const arry = [1, 2, 3, 4, 5];

const result = arry.reduce(function(accu, curr) {
    return accu + curr * 2;
}, 0);

console.log(result)
```



## Vue3のメカニズム

