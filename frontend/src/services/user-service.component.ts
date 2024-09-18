export const UserLogin = async (username: string, password: string): Promise<any> => {
    try {
        const response = await fetch('http://localhost:3000/v1/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        });
    
        const data = await response.json();
    
        if (!response.ok) {
            return { success: false, message: data.message || 'Login failed' };
        }
    
        return { success: true, message: 'Login successful', data: data };
    } catch (error) {
        return { success: false, message: 'Error during login' };
    }
};