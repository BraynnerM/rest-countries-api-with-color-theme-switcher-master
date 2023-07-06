import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './home';
import { Details } from './details';

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;