import { config } from 'dotenv';
import express from 'express';
import { authRouter } from './src/routes/auth.js';
import { foodSpotsRouter } from './src/routes/foodSpots.js';
import { reviewsRouter } from './src/routes/reviews.js';
import { rankingRouter } from './src/routes/ranking-route.js';

config()


const app = express()

app.use(express.json())
app.use('/auth', authRouter)
app.use('/foodSpots', foodSpotsRouter)
app.use('/reviews', reviewsRouter)
app.use('/ranking', rankingRouter)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor iniciado em localhost:${PORT}`)
})
