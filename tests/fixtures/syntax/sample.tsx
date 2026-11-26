type Account = {
  id: string;
  displayName: string;
  active: boolean;
};

const DEFAULT_LIMIT = 24;

export function AccountCard({ account, onSelect }: {
  account: Account;
  onSelect: (id: string) => void;
}) {
  const label = account.active ? account.displayName : "Inactive";

  return (
    <button onClick={() => onSelect(account.id)}>
      <span>{label}</span>
      <small>Account #{DEFAULT_LIMIT}</small>
    </button>
  );
}
