/**
 * Created by mgobbi on 12/09/2017.
 */
exports.getGroup = group => {
    var result = {
        "@context": "http://schema.org",
        "@type": "MusicGroup",
        "@id": group.seo.url,
        "name": group.name,
        "sameAs": group.website,
        "foundingLocation": {
            "@type": "City",
            "name": group.location
        },

        "genre": (group.generi || "").toString(),
        "album": (group.dischi || []).map(disco => {
            //todo disco.seo!!!
            disco.seo={};
            return {
                "albumReleaseType": "http://schema.org/AlbumRelease",
                "@type": "MusicAlbum",
                "@id": disco.seo.url,
                "creditedTo": group.name,
                "byArtist": {
                    "@type": "MusicGroup",
                    "@id": group.seo.url,
                    "name": group.name
                },
                "name": disco.name,
                "albumProductionType": "http://schema.org/StudioAlbum"
            }
        }),
        "member":(group.membri || []).map(m=>{
            return {
                "@type": "OrganizationRole",
                "member": {
                    "@type": "Person",
                    "name": m.name
                },

                "roleName": m.strumenti
            }
        })
    };
    return result;
};