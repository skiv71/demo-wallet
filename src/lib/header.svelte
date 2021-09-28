<svelte:options tag={null}/>

<script>
    import { onMount } from 'svelte'
    export var person = { name: ``, age: `` };
    onMount(() => {
        setTimeout(() => {
            console.log(`timeout`)
            person.age = 30
        }, 10e3)
    })
</script>

<style>
    p {
        font-size: small;
        color: crimson; 
    }
</style>

<div>
    <p>Rocker {person.name}</p>
</div>
