export default function PrivacyPage() {
    return (
        <main style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
            <h1>Política de Privacidade</h1>
            <p>Você pode baixar a versão oficial da Política de Privacidade no link abaixo.</p>
            <p>
                <a href="/politica-de-privacidade.pdf" style={{ color: "#2563eb" }}>
                    Baixar Política de Privacidade (PDF)
                </a>
            </p>
            <hr style={{ margin: "24px 0" }} />
            <p style={{ color: "#6b7280" }}>
                Se o link não funcionar, verifique se o arquivo PDF está presente em
                <code> /public/politica-de-privacidade.pdf</code> do projeto.
            </p>
        </main>
    );
}
