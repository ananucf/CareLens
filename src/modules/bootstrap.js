import authRouter from "./auth/auth.routes.js"
import anemiaRouter from "./Diagnosis/anemia.routes.js"
import pressureRouter from "./Diagnosis/bloodPressure.routes.js"
import diabetesRouter from "./Diagnosis/diabetes.routes.js"
import heartRouter from "./Diagnosis/heart.routes.js"
import productHistoryRouter from "./productHistory/productHistory.routes.js"
import scanRouter from "./scan/scan.routes.js"
import anemiaStatRouter from "./statistics/anemiaStat.routes.js"
import pressureStatRouter from "./statistics/bloodPressureStat.routes.js"
import diabetesStatRouter from "./statistics/diabetesStat.routes.js"
import heartDiseaseStatRouter from "./statistics/heartStat.routesStat.js"
import userRouter from "./user/user.routes.js"

export const bootstrap = (app) => {
    app.use('/api/users', userRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/anemia', anemiaRouter);
    app.use('/api/pressure', pressureRouter);
    app.use('/api/heart', heartRouter);
    app.use('/api/diabetes', diabetesRouter);
    app.use('/api/scan', scanRouter)
    app.use('/api/product-history', productHistoryRouter)
    app.use('/api/anemia-statistics', anemiaStatRouter)
    app.use('/api/pressure-statistics', pressureStatRouter)
    app.use('/api/heart-statistics', heartDiseaseStatRouter)
    app.use('/api/diabetes-statistics', diabetesStatRouter)
}