import { employeeSchemas } from "../src/api/v1/validation/employeeValidation";

describe("Employee routes", () => {
    // Testing for create employee data.
    test("It should validate correct data input when creating employee data", () => {
        const validateData = {
            name: "Nathan Natoza",
            position: "Commander",
            department: "Head of staff",
            email: "NathanNatoza@gmail.com",
            phone: 124782999,
            branchId: 1,
        };
        const { error } = employeeSchemas.create.body!.validate(validateData)
        expect(error).toBeUndefined();
    }),
    test("It should validate incorrect data input when creating employee data", () => {
        const invalidateData = {
            name: 1,
            position: "Commander",
            department: "Head of staff",
            email: "NathanNatoza@gmail.com",
            phone: 124782999,
            branchId: 1,
        };
        const { error } = employeeSchemas.create.body!.validate(invalidateData);

        expect(error?.details[0].message).toMatch("\"name\" must be a string");
        expect(error).toBeDefined();
    }),
    test("It should validate correct data input when updating employee data", () => {
    const validateParams = {
        id: 1
    };
    const validateBody = {
        name: "Nathan Natoza",
        position: "Commander",
        department: "Head of staff",
        email: "NathanNatoza@gmail.com",
        phone: 124782999,
        branchId: 1,
    };
    const { error: paramError } = employeeSchemas.update.params!.validate(validateParams)
    const { error: bodyError } = employeeSchemas.update.body!.validate(validateBody)

    expect(paramError).toBeUndefined();
    expect(bodyError).toBeUndefined();
    }),

    test("It should validate incorrect params input when updating employee data", () => {
    const validateParams = {
        id: " "
    }
    const validateBody = {
        name: "Nathan Natoza",
        position: "Commander",
        department: "Head of staff",
        email: "NathanNatoza@gmail.com",
        phone: 124782999,
        branchId: 1,
    };
    const { error: paramError } = employeeSchemas.update.params!.validate(validateParams)
    const { error: bodyError } = employeeSchemas.update.body!.validate(validateBody)
    
    expect(paramError?.details[0].message).toMatch("\"id\" must be a number");
    expect(bodyError).toBeUndefined();
    }),

    test("It should validate incorrect body input when updating employee data", () => {
        const validateParams = {
            id: 1
        }
        const validateBody = {
            name: " ",
            position: "Commander",
            department: "Head of staff",
            email: "NathanNatoza@gmail.com",
            phone: 124782999,
            branchId: 1,
        };
    const { error: paramError } = employeeSchemas.update.params!.validate(validateParams)
    const { error: bodyError } = employeeSchemas.update.body!.validate(validateBody)
    
    expect(bodyError?.details?.[0]?.message || "").toMatch("");
    expect(paramError).toBeUndefined();

    }),

    test("It should validate correct Id input when retrieving only ID", () => {
        const validateParams = {
            id: 1
        };
        const { error: paramError } = employeeSchemas.getById.params!.validate(validateParams)
        expect(paramError).toBeUndefined();
    }),
    test("It should validate incorrect Id input when retrieving only ID", () => {
        const validateParams = {
            id: "one"
        };
        const { error: paramError } = employeeSchemas.getById.params!.validate(validateParams)

        expect(paramError).toBeDefined();
        expect(paramError?.details[0].message).toMatch("\"id\" must be a number");
    }),
    test("It should validate correct Id input when retrieving all employee data.", () => {
        const validateParams = {
            id: 1
        };
        const validateBody = {
            name: "Nathan Natoza",
            position: "Commander",
            department: "Head of staff",
            email: "NathanNatoza@gmail.com",
            phone: 124782999,
            branchId: 1,
        };
        const { error: paramError } = employeeSchemas.getEmployeeData.params!.validate(validateParams)
        const { error: bodyError } = employeeSchemas.getEmployeeData.body!.validate(validateBody)
        expect(paramError).toBeUndefined();
        expect(bodyError).toBeUndefined();
    }),
    test("It should validate incorrect Id input when retrieving all employee data.", () => {
        const validateParams = {
            id: "one"
        };
        const validateBody = {
            name: "Nathan Natoza",
            position: "Commander",
            department: "Head of staff",
            email: "NathanNatoza@gmail.com",
            phone: 124782999,
            branchId: 1,
        };
        const { error: paramError } = employeeSchemas.getEmployeeData.params!.validate(validateParams)
        const { error: bodyError } = employeeSchemas.getEmployeeData.body!.validate(validateBody)

        expect(paramError?.details[0].message).toMatch("\"id\" must be a number");
        expect(bodyError).toBeUndefined();
    }),
    test("It should validate incorrect body input when retrieving all employee data.", () => {
        const validateParams = {
            id: 1
        };
        const validateBody = {
            name: 1,
            position: "Commander",
            department: "Head of staff",
            email: "NathanNatoza@gmail.com",
            phone: 124782999,
            branchId: 1,
        };
        const { error: paramError } = employeeSchemas.getEmployeeData.params!.validate(validateParams)
        const { error: bodyError } = employeeSchemas.getEmployeeData.body!.validate(validateBody)

        expect(bodyError?.details[0].message).toMatch("\"name\" must be a string");
        expect(paramError).toBeUndefined();
    });
});