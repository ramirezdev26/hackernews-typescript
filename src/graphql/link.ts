import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus';
import { NexusGenObjects } from '../../nexus-typegen';


export const Link = objectType({
    name: 'Link', 
    definition(t) {  
        t.nonNull.int('id'); 
        t.nonNull.string('description'); 
        t.nonNull.string('url'); 
    },
});



export const LinkQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("feed", {
            type: "Link",
            resolve(parent, args, context, info) {
                return context.prisma.link.findMany();
            },
        });
    },
});

export const LinkOneQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field("linkOne", {
            type: "Link",
            args: {
                id: nonNull(intArg())
            },
            resolve(parent, args, context, info) {
                try {
                    return context.prisma.link.findUnique({
                        where: {id: args.id || undefined} 
                    });
                } catch (e) {
                    throw new Error (
                        `Post with ID ${args.id} does not exist in the database.`,
                        )
                }
            }
        })
    }
})



export const LinkMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("post", {
            type: "Link",
            args: {
                description: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },
            
            resolve(parent, args, context) {
                const newLink = context.prisma.link.create({
                    data: {
                        description: args.description,
                        url: args.url,
                    },
                });
                return newLink
            },
        });
    },
});

export const LinkUpdate = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("update", {
            type: "Link",
            args: {
                id: nonNull(intArg()),
                description: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },
            
            resolve(parent, args, context) {
                    try {
                    const { id, description, url } = args;
                    return context.prisma.link.update({
                        where: { id: id },
                        data: {
                            description: args.description,
                            url: args.url,
                        }
                    })
                        } catch (e){
                            throw new Error (
                            `Post with ID ${args.id} does not exist in the database.`,
                            )
                }
            }
        })
    }
})

export const LinkDelete = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("delete", {
            type: "Link",
            args: {
                id: nonNull(intArg()),
            },
            
            resolve(parent, args, context) {
                try {
                    return context.prisma.link.delete({
                        where: { id: args.id },
                })
                } catch (e){
                    throw new Error (
                        `Post with ID ${args.id} does not exist in the database.`,
                        )
                }
            }
        })
    }
})