<script setup lang="ts">
import { ref } from 'vue'
import { userStore } from '../stores/user'
import { useRouter, useRoute } from 'vue-router';
import { isApplicationError } from '../mixing/errorMessageMixing';

const identifier = ref("")
const password = ref("")
const store = userStore()
const router = useRouter()
const route = useRoute()

const validated = ref(false)
const validationMessage = ref("")

async function authenticate(event: MouseEvent){
    event.preventDefault()
    event.stopPropagation()
    validated.value = true
    if(identifier.value && password.value) {
        const result = await store.authenticate(identifier.value, password.value)
        if(isApplicationError(result)) {
            validationMessage.value = result.message
        } else {
            validationMessage.value = ""
            let redirect = "/"
            if(store.isAdmin) {
                redirect = route.query.redirect ? route.query.redirect as string: "/admin"
            }
            router.push(redirect)
        }
    }
}

</script>

<template>
    <div class="row justify-content-center">
        <div class="col-6 card" >
            <div class="card-body">
                <h5 class="card-title">Sign in</h5>
                <div class="alert alert-danger" v-if="validationMessage" role="alert">
                    {{validationMessage}}
                </div>
                <form :class="{ 'was-validated': validated}">
                    <div class="mb-3">
                        <label for="emailInput" class="form-label">Email:</label>
                        <input type="email" class="form-control" id="emailInput" placeholder="mail@mail.com" v-model="identifier" required>
                        <div class="invalid-feedback">
                            Você deve informar um email válido.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">Password</label>
                        <input type="password" class="form-control" id="passwordInput" v-model="password" required>
                        <div class="invalid-feedback">
                            A senha é um campo obrigatório.
                        </div>
                    </div>
                    <div class="mb-3">
                        <input type="submit" class="float-end btn btn-primary" value="Enviar" @click="authenticate"/>
                    </div>
                </form>
                
            </div>
        </div>
    </div>
    
</template>
