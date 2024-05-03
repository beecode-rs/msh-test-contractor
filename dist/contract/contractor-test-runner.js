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
                contractor(contract, fnName);
            });
        });
    },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3Rvci10ZXN0LXJ1bm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cmFjdC9jb250cmFjdG9yLXRlc3QtcnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUE7QUFDM0IsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFBO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFakMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFBO0FBR3JELE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHO0lBQ25DLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBb0IsRUFBaUIsRUFBRTtRQUNwRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQTtRQUN6RCxpSkFBaUo7UUFDakosTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDekMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFjLENBQUMsQ0FBQTtJQUN2RCxDQUFDO0lBQ0QsUUFBUSxFQUFFLENBQUMsUUFBcUIsRUFBUSxFQUFFO1FBQ3pDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtZQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFjLEVBQUUsRUFBRTtnQkFDcEQsVUFBVSxDQUFDLFFBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQTtZQUNwQyxDQUFDLENBQUMsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUNELEdBQUcsRUFBRSxLQUFLLEVBQUUsV0FBbUIsRUFBaUIsRUFBRTtRQUNqRCxRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtZQUMxQixLQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUMvRixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7SUFDRCxJQUFJLEVBQUUsQ0FBQyxZQUFvQixFQUFRLEVBQUU7UUFDcEMsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtZQUNqQyxNQUFNLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUMvQyxDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7Q0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2xvYiB9IGZyb20gJ2dsb2InXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZGVzY3JpYmUgfSBmcm9tICd2aXRlc3QnXG5cbmltcG9ydCB7IGNvbnRyYWN0b3IgfSBmcm9tICcjc3JjL2NvbnRyYWN0L2NvbnRyYWN0b3InXG5pbXBvcnQgeyBBbnlDb250cmFjdCB9IGZyb20gJyNzcmMvdHlwZXMnXG5cbmV4cG9ydCBjb25zdCBjb250cmFjdG9yVGVzdFJ1bm5lciA9IHtcblx0X2ZpbGU6IGFzeW5jIChmaWxlTG9jYXRpb246IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdGNvbnN0IG1vZHVsZVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgZmlsZUxvY2F0aW9uKVxuXHRcdC8vIGNvbnNvbGUubG9nKCdjb250cmFjdG9yVGVzdFJ1bm5lci5kaXIgcGFyYW1zOicsIHsgZmlsZUxvY2F0aW9uLCBtb2R1bGVQYXRoLCBjd2Q6IHByb2Nlc3MuY3dkKCksIF9fZGlybmFtZSB9KSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0XHRjb25zdCBjb250cmFjdCA9IGF3YWl0IGltcG9ydChtb2R1bGVQYXRoKVxuXHRcdGNvbnRyYWN0b3JUZXN0UnVubmVyLmNvbnRyYWN0KGNvbnRyYWN0LmRlZmF1bHQgYXMgYW55KVxuXHR9LFxuXHRjb250cmFjdDogKGNvbnRyYWN0OiBBbnlDb250cmFjdCk6IHZvaWQgPT4ge1xuXHRcdGRlc2NyaWJlKGNvbnRyYWN0LnN1YmplY3ROYW1lLCAoKSA9PiB7XG5cdFx0XHRPYmplY3Qua2V5cyhjb250cmFjdC5mbnMpLmZvckVhY2goKGZuTmFtZTogc3RyaW5nKSA9PiB7XG5cdFx0XHRcdGNvbnRyYWN0b3IoY29udHJhY3QgYXMgYW55LCBmbk5hbWUpXG5cdFx0XHR9KVxuXHRcdH0pXG5cdH0sXG5cdGRpcjogYXN5bmMgKGRpckxvY2F0aW9uOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRkZXNjcmliZShkaXJMb2NhdGlvbiwgKCkgPT4ge1xuXHRcdFx0dm9pZCBQcm9taXNlLmFsbChnbG9iLnN5bmMoYCR7ZGlyTG9jYXRpb259LyoqLyouY29udHJhY3QudHNgKS5tYXAoY29udHJhY3RvclRlc3RSdW5uZXIuX2ZpbGUpKVxuXHRcdH0pXG5cdH0sXG5cdGZpbGU6IChmaWxlTG9jYXRpb246IHN0cmluZyk6IHZvaWQgPT4ge1xuXHRcdGRlc2NyaWJlKGZpbGVMb2NhdGlvbiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0YXdhaXQgY29udHJhY3RvclRlc3RSdW5uZXIuX2ZpbGUoZmlsZUxvY2F0aW9uKVxuXHRcdH0pXG5cdH0sXG59XG4iXX0=