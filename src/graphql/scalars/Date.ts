import { asNexusMethod } from "nexus";
import { GraphQLDate } from "graphql-scalars";

export const GQLDate = asNexusMethod(GraphQLDate, "dateTime")