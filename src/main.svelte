<svelte:options tag={null}/>

<script>
    import AppHeader  from './lib/header.svelte';
    var message = `Hello, Tool... how you doing today?`
    var person = { name: `HHHHHHHHHHHHHHHHHH`, age: 0 }
</script>

<div>
    <style>
        p {
            font-size: large;
            color: cornflowerblue;
        }
    </style>
    <p>{message}</p>
    <AppHeader bind:person="{person}"/>
    <p>{person.age}</p>
</div>
