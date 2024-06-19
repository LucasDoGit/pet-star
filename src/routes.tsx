import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { ProductDetail } from "./pages/detail";
import { NotFound } from "./pages/notfound";

import { Layout } from "./components/layout";
import { Cart } from "./pages/cart";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/detail/:id",
                element: <ProductDetail />
            },
            {
                path: "*",
                element: <NotFound />
            },
        ]
    }
])

export { router }