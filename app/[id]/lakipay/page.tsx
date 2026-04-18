import LakiPaymentPage from "@/components/Lakipay";


export default async function Payment({ params }: { params: Promise<{ id: string }> }) {
        const { id } = await params;
    return (
    <LakiPaymentPage
            id={id}

          />)
}