const data = [];

module.exports = {
    async reset (req, res) {
        data.splice(0, data.length);
        return res.status(200).end("OK");
    },
    async index (req, res) {
        const { account_id } = req.query;
        let account = [];
        if (data.length > 0) account = data.find(acc => acc.id === account_id);
        if (account && account.id) return res.status(200).end(String(account.balance));
        return res.status(404).end("0");
    },
    async create (req, res) {
        const { type, amount, origin, destination } = req.body;
        switch (type) {
            case "deposit":
                let deposit_account = [];
                if (data.length > 0) deposit_account = data.find(acc => acc.id === destination);
                if (data.length === 0 || !deposit_account) create_account(destination, amount);
                if (deposit_account.id) {
                    deposit(destination, amount);
                }
                deposit_account = data.find(acc => acc.id === destination);
                return res.status(201).json({
                    destination: {
                        id: deposit_account.id,
                        balance: deposit_account.balance,
                    }
                });
            case "withdraw":
                let account = [];
                if (data.length > 0) account = data.find(acc => acc.id === origin);
                if (data.length === 0 || !account) return res.status(404).end("0");
                if (amount > account.balance) return res.status(400).end("0");
                account.balance = account.balance - amount;
                account = data.find(acc => acc.id === origin);
                return res.status(201).json({
                    origin: {
                        id: account.id,
                        balance: account.balance,
                    }
                });
            case "transfer":
                let origin_account = [];
                if (data.length > 0) origin_account = data.find(acc => acc.id === origin);
                let destination_account = [];
                if (data.length > 0) destination_account = data.find(acc => acc.id === destination);
                if (!origin_account) return res.status(404).end("0");
                if (!destination_account) create_account(destination, 0);
                if (origin_account.balance >= amount) {
                    destination_account = data.find(acc => acc.id === destination);
                    debit(origin_account.id, amount);
                    deposit(destination_account.id, amount);
                    origin_account = data.find(acc => acc.id === origin);
                    destination_account = data.find(acc => acc.id === destination);
                    return res.status(201).json({
                        origin: origin_account,
                        destination: destination_account
                    });
                }
                return res.status(400).json({ message: "Not enough balance" });
            default:
                res.status(404).json({ message: `Operation "${type}" not found` });
        }
    },

    async get (req, res) {
        return res.status(200).json({ data });
    }
}

function create_account (id, balance) {
    data.push({id, balance});
}

function deposit (id, amount) {
    let account = data.find(acc => acc.id === id);
    account.balance = account.balance + amount;
}

function debit (id, amount) {
    let account = data.find(acc => acc.id === id);
    account.balance = account.balance - amount
}