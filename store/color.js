export const state = () => ({
    primary: '#7957d5'
})

export const mutations = {
    modify (state, color) {
        state.primary = color
    }
}