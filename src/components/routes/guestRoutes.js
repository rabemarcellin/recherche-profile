const guestRoutes = ['/', '/login', '/sign-up'];
export default guestRoutes;

export const isGuestRoute = (route) => {
    // Regular expression pattern to match the beginning and optionally ending with '/'
    const regexPattern = new RegExp(`^${route}/?$`);

    // Check if the route matches the regex pattern
    if (regexPattern.test(route)) {
        const baseRoute = route.split('/')[1]; 
        return guestRoutes.includes(`/${baseRoute}`);
    } else {
        return false;
    }
};
