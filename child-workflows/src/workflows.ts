import { createChildWorkflowHandle } from '@temporalio/workflow';

export async function childWorkflow(name: string): Promise<string> {
  return `i am a child named ${name}`;
}

// @@@SNIPSTART typescript-child-workflow
export async function parentWorkflow(names: string[]): Promise<string> {
  const responseArray = await Promise.all(
    names.map((name) => {
      const child = createChildWorkflowHandle(childWorkflow);
      return child.execute(name);
    })
  );
  return responseArray.join('\n');
}
// @@@SNIPEND