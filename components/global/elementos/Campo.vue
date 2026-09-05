<template>
  <div class="campo">
    <label :for="id">
      {{ label }}
      <span v-if="obrigatorio">*</span>
    </label>
    <input :id="id" :type="tipo" :placeholder="placeholder" :autocomplete="completar" spellCheck="false" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @blur="$emit('blur', $event)" :readonly="bloqueado" />
  </div>
</template>

<script setup>
const props = defineProps({
  completar: { type: String, default: 'false' },
  tipo: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  obrigatorio: { type: Boolean, default: false },
  bloqueado: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'blur'])

// o label precisa apontar pro input, e um campo pode aparecer varias vezes na pagina
const id = `campo-${useId()}`
</script>

<style lang="sass" scoped>
.campo
  display: flex
  flex-direction: column
  align-items: flex-start
  width: 100%
  gap: 8px

  label
    font-family: var(--bold)
    font-size: var(--f1)
    color: var(--cor-azul)

    span
      color: var(--cor-azul-medio)

  input
    width: 100%
    height: 52px
    padding: 0 18px 0 18px
    border: 2px solid var(--cor-cinza-claro)
    border-radius: 100px
    background-color: var(--cor-branco)
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-azul-escuro)
    transition: border-color 0.3s

    &::placeholder
      color: var(--cor-cinza)

    &:focus
      border-color: var(--cor-azul-medio)

@media screen and (max-width: 1000px)
  .campo input
    height: 48px
</style>
