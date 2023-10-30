export default function ConnectButton() {
  return (
    <div className="flex gap-4">
      <w3m-button
        size="md"
        label={"App Wallet"}
        balance={"hide"}
        loadingLabel="Connecting"
      />
      <w3m-network-button />
    </div>
  );
}
