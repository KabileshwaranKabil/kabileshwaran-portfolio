# PHP Quick Notes

## Basics
- PHP files usually have the `.php` extension.
- Embed PHP in HTML with `<?php ... ?>` tags.

Example:

```php
<?php
  echo "Hello, world!";
?>
```

## Variables and types
- Variables begin with `$`, e.g. `$name = "Alice";`
- Common types: string, int, float, bool, array, object, null.

## Arrays

```php
$fruits = ["apple", "banana", "cherry"]; 
echo $fruits[1]; // banana
```

## Functions

```php
function add($a, $b) {
  return $a + $b;
}

echo add(2,3); // 5
```

## Working with forms (POST)

```php
if($_SERVER['REQUEST_METHOD'] === 'POST'){
  $name = $_POST['name'] ?? '';
  // validate and use $name
}
```

## Useful resources
- https://www.php.net/manual/en/
- https://www.phptherightway.com/
