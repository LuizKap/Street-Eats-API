

const calculateMedia = (foodSpot) => {
    if (foodSpot.reviews.length === 0) return 

    const notas = foodSpot.reviews.map(review => review.nota)
    const soma = notas.reduce((acc, nota) => {
        return acc + nota
    }, 0)

    const media = soma / foodSpot.reviews.length
    return media
}


export { calculateMedia }