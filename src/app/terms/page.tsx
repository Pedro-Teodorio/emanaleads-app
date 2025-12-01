export default function TermsPage() {
    return (
        <main style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
            <h1>Termos de Uso</h1>
            <p>Você pode baixar a versão oficial dos Termos de Uso no link abaixo.</p>
            <p>
                <a href="/termos-de-uso.pdf" style={{ color: "#2563eb" }}>
                    Baixar Termos de Uso (PDF)
                </a>
            </p>
            <hr style={{ margin: "24px 0" }} />
            <p style={{ color: "#6b7280" }}>
                Se o link não funcionar, verifique se o arquivo PDF está presente em
                <code> /public/termos-de-uso.pdf</code> do projeto.
            </p>
        </main>
    );
}
