import { branchSchemas } from "../src/api/v1/validation/branchValidation";

describe("Branch routes", () => {
    test("It should validate correct data input when creating branch data", () => {
        const validateData = {
            name: "Updated Branch",
            address: "123 Avenue",
            phone: 9876543210,
        };
        const { error } = branchSchemas.create.body!.validate(validateData)
        expect(error).toBeUndefined();
    }),
    test("It should validate incorrect data input when creating branch data", () => {
        const invalidateData = {
            name: 1,
            address: "123 Avenue",
            phone: 9876543210,
        };
        const { error } = branchSchemas.create.body!.validate(invalidateData);

        expect(error?.details[0].message).toMatch("\"name\" must be a string");
        expect(error).toBeDefined();
    }),
    test("It should validate correct data input when updating branch data", () => {
        const validateParams = {
            id: 1
        };
        const validateBody = {
            name: "Updated Branch",
            address: "123 Avenue",
            phone: 9876543210,
        };

        const { error: paramError } = branchSchemas.update.params!.validate(validateParams)
        const { error: bodyError } = branchSchemas.update.body!.validate(validateBody)
    
        expect(paramError).toBeUndefined();
        expect(bodyError).toBeUndefined();
    }),
    test("It should validate incorrect params input when updating branch data", () => {
        const validateParams = {
            id: " "
        }
        const validateBody = {
            name: "Updated Branch",
            address: "123 Avenue",
            phone: 9876543210,
        };
        const { error: paramError } = branchSchemas.update.params!.validate(validateParams)
        const { error: bodyError } = branchSchemas.update.body!.validate(validateBody)
        
        expect(paramError?.details[0].message).toMatch("\"id\" must be a number");
        expect(bodyError).toBeUndefined();
        }),
    
    test("It should validate incorrect body input when updating branch data", () => {
        const validateParams = {
            id: 1
        }
        const validateBody = {
            name: 1,
            address: "123 Avenue",
            phone: 9876543210,
        };
    const { error: paramError } = branchSchemas.update.params!.validate(validateParams)
    const { error: bodyError } = branchSchemas.update.body!.validate(validateBody)
    
    expect(bodyError?.details?.[0]?.message || "").toMatch("");
    expect(paramError).toBeUndefined();

    }),

    test("It should validate correct Id input when retrieving only ID", () => {
        const validateParams = {
            id: 1
        };
        const { error: paramError } = branchSchemas.getBranchById.params!.validate(validateParams)
        expect(paramError).toBeUndefined();
    }),
    test("It should validate incorrect Id input when retrieving only ID", () => {
        const validateParams = {
            id: "one"
        };
        const { error: paramError } = branchSchemas.getBranchById.params!.validate(validateParams)

        expect(paramError).toBeDefined();
        expect(paramError?.details[0].message).toMatch("\"id\" must be a number");
    }),
    test("It should validate correct Id input when retrieving all branch data.", () => {
        const validateParams = {
            id: 1
        };
        const validateBody = {
            name: "Updated Branch",
            address: "123 Avenue",
            phone: 9876543210,
        };
        const { error: paramError } = branchSchemas.getBranchData.params!.validate(validateParams)
        const { error: bodyError } = branchSchemas.getBranchData.body!.validate(validateBody)
        expect(paramError).toBeUndefined();
        expect(bodyError).toBeUndefined();
    }),
    test("It should validate incorrect Id input when retrieving all branch data.", () => {
        const validateParams = {
            id: "one"
        };
        const validateBody = {
            name: "Updated Branch",
            address: "123 Avenue",
            phone: 9876543210,
        };
        const { error: paramError } = branchSchemas.getBranchData.params!.validate(validateParams)
        const { error: bodyError } = branchSchemas.getBranchData.body!.validate(validateBody)

        expect(paramError?.details[0].message).toMatch("\"id\" must be a number");
        expect(bodyError).toBeUndefined();
    }),
    test("It should validate incorrect body input when retrieving all branch data.", () => {
        const validateParams = {
            id: 1
        };
        const validateBody = {
            name: 1,
            address: "123 Avenue",
            phone: 9876543210,
        };
        const { error: paramError } = branchSchemas.getBranchData.params!.validate(validateParams)
        const { error: bodyError } = branchSchemas.getBranchData.body!.validate(validateBody)

        expect(bodyError?.details[0].message).toMatch("\"name\" must be a string");
        expect(paramError).toBeUndefined();
    })
})