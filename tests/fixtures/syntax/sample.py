from dataclasses import dataclass

DEFAULT_LIMIT = 24


@dataclass
class Account:
    identifier: str
    display_name: str
    active: bool = True


def format_account(account: Account) -> str:
    """Return a readable account label."""
    state = "active" if account.active else "inactive"
    return f"{account.display_name} ({state})"
