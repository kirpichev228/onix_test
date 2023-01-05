public class AccountTriggerUtils {
    public static void createTaskForTechnologyPartners(List<Account> accounts) {
        List<Task> tasksToInsert = new List<Task>();
        for (Account account : accounts) {
          if (account.Type == 'Technology Partner') {
            Task task = new Task(
              Subject = 'Follow up with ' + account.Name,
              Status = 'Not Started',
              Priority = 'Normal',
              AccountId = account.Id
            );
            tasksToInsert.add(task);
          }
        }
        if (!tasksToInsert.isEmpty()) {
          insert tasksToInsert;
        }
      }

      public static void updateTaskFields(List<Account> accounts) {
        List<Task> tasksToUpdate = new List<Task>();
        for (Account account : accounts) {
          Task task = [SELECT Id FROM Task WHERE AccountId = :account.Id LIMIT 1];
          if (task != null) {
            task.Description = 'Follow up with ' + account.Name + ' regarding ' + account.Type;
            tasksToUpdate.add(task);
          }
        }
        if (!tasksToUpdate.isEmpty()) {
          update tasksToUpdate;
        }
      }
  }