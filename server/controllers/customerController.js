import * as repository from "../repository/customerRepository.js";

export const getAll = async (req, res) => {
  try {
    const customers = await repository.selectAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Erro no servidor" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await repository.selectById(id);
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Erro no servidor" });
  }
};

export const create = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      source,
      description = null,
    } = req.body;
    const result = await repository.create(
      name,
      email,
      phone,
      address,
      source,
      description
    );
    res
      .status(201)
      .json({ message: "Cliente adicionado com sucesso", client: result });
  } catch (error) {
    res.status(500).json({ error: "Erro no servidor" });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phone,
      address,
      source,
      description = null,
    } = req.body;
    const result = await repository.update(
      id,
      name,
      email,
      phone,
      address,
      source,
      description
    );
    res
      .status(201)
      .json({ message: "Dados alterados com sucesso", client: result });
  } catch (error) {
    res.status(500).json({ error: "Erro no servidor" });
  }
};

export const updatePartial = async (req, res) => {
  try {
    const { id } = req.params;
    const { propName, propNewValue } = req.body;
    const result = await repository.patch(id, propName, propNewValue);
    res
      .status(201)
      .json({ message: `${propName} alterado com sucesso`, client: result });
  } catch (error) {
    res.status(500).json({ error: "Erro no servidor" });
  }
};
