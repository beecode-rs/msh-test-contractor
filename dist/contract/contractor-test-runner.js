import { glob } from 'glob';
import path from 'path';
import { describe } from 'vitest';
import { contractor } from '#src/contract/contractor';
export const contractorTestRunner = {
    _file: async (fileLocation) => {
        const modulePath = path.join(process.cwd(), fileLocation);
        // console.log('contractorTestRunner.dir params:', { fileLocation, modulePath, cwd: process.cwd(), __dirname }) // eslint-disable-line no-console
        const contract = await import(modulePath);
        contractorTestRunner.contract(contract.default);
    },
    contract: (contract) => {
        describe(contract.subjectName, () => {
            Object.keys(contract.fns).forEach((fnName) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                contractor(contract, fnName);
            });
        });
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    dir: async (dirLocation) => {
        describe(dirLocation, () => {
            void Promise.all(glob.sync(`${dirLocation}/**/*.contract.ts`).map(contractorTestRunner._file));
        });
    },
    file: (fileLocation) => {
        describe(fileLocation, async () => {
            await contractorTestRunner._file(fileLocation);
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3Rvci10ZXN0LXJ1bm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cmFjdC9jb250cmFjdG9yLXRlc3QtcnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUE7QUFDM0IsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFBO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFakMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFBO0FBR3JELE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHO0lBQ25DLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBb0IsRUFBaUIsRUFBRTtRQUNwRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQTtRQUN6RCxpSkFBaUo7UUFDakosTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDekMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0lBQ0QsUUFBUSxFQUFFLENBQUMsUUFBcUIsRUFBUSxFQUFFO1FBQ3pDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtZQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFjLEVBQUUsRUFBRTtnQkFDcEQsOERBQThEO2dCQUM5RCxVQUFVLENBQUMsUUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBQ3BDLENBQUMsQ0FBQyxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBQ0QsNERBQTREO0lBQzVELEdBQUcsRUFBRSxLQUFLLEVBQUUsV0FBbUIsRUFBaUIsRUFBRTtRQUNqRCxRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtZQUMxQixLQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUMvRixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7SUFDRCxJQUFJLEVBQUUsQ0FBQyxZQUFvQixFQUFRLEVBQUU7UUFDcEMsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtZQUNqQyxNQUFNLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUMvQyxDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7Q0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2xvYiB9IGZyb20gJ2dsb2InXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZGVzY3JpYmUgfSBmcm9tICd2aXRlc3QnXG5cbmltcG9ydCB7IGNvbnRyYWN0b3IgfSBmcm9tICcjc3JjL2NvbnRyYWN0L2NvbnRyYWN0b3InXG5pbXBvcnQgeyB0eXBlIEFueUNvbnRyYWN0IH0gZnJvbSAnI3NyYy90eXBlcy9pbmRleCdcblxuZXhwb3J0IGNvbnN0IGNvbnRyYWN0b3JUZXN0UnVubmVyID0ge1xuXHRfZmlsZTogYXN5bmMgKGZpbGVMb2NhdGlvbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdFx0Y29uc3QgbW9kdWxlUGF0aCA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBmaWxlTG9jYXRpb24pXG5cdFx0Ly8gY29uc29sZS5sb2coJ2NvbnRyYWN0b3JUZXN0UnVubmVyLmRpciBwYXJhbXM6JywgeyBmaWxlTG9jYXRpb24sIG1vZHVsZVBhdGgsIGN3ZDogcHJvY2Vzcy5jd2QoKSwgX19kaXJuYW1lIH0pIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHRcdGNvbnN0IGNvbnRyYWN0ID0gYXdhaXQgaW1wb3J0KG1vZHVsZVBhdGgpXG5cdFx0Y29udHJhY3RvclRlc3RSdW5uZXIuY29udHJhY3QoY29udHJhY3QuZGVmYXVsdClcblx0fSxcblx0Y29udHJhY3Q6IChjb250cmFjdDogQW55Q29udHJhY3QpOiB2b2lkID0+IHtcblx0XHRkZXNjcmliZShjb250cmFjdC5zdWJqZWN0TmFtZSwgKCkgPT4ge1xuXHRcdFx0T2JqZWN0LmtleXMoY29udHJhY3QuZm5zKS5mb3JFYWNoKChmbk5hbWU6IHN0cmluZykgPT4ge1xuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRcdFx0XHRjb250cmFjdG9yKGNvbnRyYWN0IGFzIGFueSwgZm5OYW1lKVxuXHRcdFx0fSlcblx0XHR9KVxuXHR9LFxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3JlcXVpcmUtYXdhaXRcblx0ZGlyOiBhc3luYyAoZGlyTG9jYXRpb246IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdGRlc2NyaWJlKGRpckxvY2F0aW9uLCAoKSA9PiB7XG5cdFx0XHR2b2lkIFByb21pc2UuYWxsKGdsb2Iuc3luYyhgJHtkaXJMb2NhdGlvbn0vKiovKi5jb250cmFjdC50c2ApLm1hcChjb250cmFjdG9yVGVzdFJ1bm5lci5fZmlsZSkpXG5cdFx0fSlcblx0fSxcblx0ZmlsZTogKGZpbGVMb2NhdGlvbjogc3RyaW5nKTogdm9pZCA9PiB7XG5cdFx0ZGVzY3JpYmUoZmlsZUxvY2F0aW9uLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRhd2FpdCBjb250cmFjdG9yVGVzdFJ1bm5lci5fZmlsZShmaWxlTG9jYXRpb24pXG5cdFx0fSlcblx0fSxcbn1cbiJdfQ==