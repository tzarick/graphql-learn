import { objectType, extendType, nonNull, stringArg, idArg } from "nexus";

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("description");
    t.nonNull.string("url");
  }
});

export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      type: "Link",
      async resolve(parent, args, context, info) {
        const linkData = await context.pg_client.query('SELECT * from linkdata');
        return linkData.rows;
      },
    });
  },
});

export const LinkByIdQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("link", {
      type: "Link",
      args: {
        id: nonNull(idArg())
      },
      async resolve(parent, args, context) {
        const { id: ID } = args;
        const linkData = await context.pg_client.query('SELECT * from linkdata WHERE id = $1', [ID]);

        return linkData?.rows[0];
      }
    });
  }
});

export const LinkMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("post", {
      type: "Link",
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },

      async resolve(parent, args, context) {
        const { description, url } = args;

        const link = {
          description: description,
          url: url
        };

        const response = await context.pg_client.query('INSERT INTO linkdata(url, description) VALUES($1, $2) RETURNING *', [link.url, link.description]);

        return response?.rows[0];
      },
    });
  },
});