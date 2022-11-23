import { objectType } from "nexus";

export const user = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("email");
    t.nonNull.list.nonNull.field("links", {
      type: "Link",
      async resolve(parent, args, context) {
        // const response = await context.pg_client.query("SELECT DISTINCT * from linkdata WHERE parentId = $1", [])
      }
    });
  },
});