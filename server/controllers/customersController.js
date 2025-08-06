import { selectAll } from "../repository/customerRepository.js";

const getAll = async (req, res) => {
  try {
    const customers = await repository.selectAll();
    console.log(res.json(customers));
  } catch (error) {
    console.error("Erro no controller customers", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

getAll();
