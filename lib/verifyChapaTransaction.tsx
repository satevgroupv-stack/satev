import axios from 'axios';
const CHAPA_AUTH = process.env.CHAPA_API_KEY;
const verifyChapaTransaction = async (txRef: string): Promise<boolean> => {
    try {
        const response = await axios.get(
            'https://api.chapa.co/v1/transaction/verify/' + txRef,
            {
                headers: {
                    Authorization: `Bearer ${CHAPA_AUTH}`,
                },
            }
        );
    return response.data.status === "success" ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export default verifyChapaTransaction;