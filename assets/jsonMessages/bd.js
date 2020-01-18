module.exports = {
    db: {
        noRecords: {
            msg: "No records found",
            message: {
                eng: "No Records found",
                pt: "Não foram encontrados dados"
            },
            status: 404,
            success: false
        },
        dbError: {
            msg: "Error",
            message: {
                eng: "Invalid data",
                pt: "Os dados que inseriu não são inválidos!"
            },
            success: false,
            status: 400,
        },
        successUpdate: {
            msg: "success",
            message: {
                eng: "Records updated with success",
                pt: "Dados alterados com sucesso"
            },
            success: true,
            status: 200,
        },
        successInsert: {
            msg: "success",
            message: {
                eng: "Record inserted with success",
                pt: "Dados inseridos com sucesso"
            },
            success: true,
            status: 201,
        },
        successDelete: {
            msg: "success",
            message: {
                eng: "Records deleted with success",
                pt: "Dados apagados com sucesso"
            },
            success: true,
            status: 200,
        },
        successDeleteU: {
            msg: "success",
            message: {
                eng: "Records updated with success",
                pt: "Dados alterados com sucesso"
            },
            success: true,
            status: 200,
        },
        duplicateRecord: {
            msg: "duplicateRecord",
            message: {
                eng: "Record already registered!",
                pt: "Já existe um registo semelhante na base de dados!"
            },
            success: false,
            err_code: 1,
            err_message: "registo já existente",
            status: 409,
        },
        requiredData: {
            msg: "dataMissing",
            message: {
                eng: "Required fields are missing",
                pt: "Falta preencher dados obrigatórios"
            },
            success: false,
            status: 400,
        },

    },
};
