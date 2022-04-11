import axios from 'axios';
import React, { useState, useEffect } from 'react';
import YAML from 'js-yaml';
import { books } from './config';
import { useDeepCompareEffect } from 'use-deep-compare';

function useFetchUsfm({ input, owner, repo, server, bookCodes }) {
  const [projects, setProjects] = useState([]);
  const [filterProjects, setFilterProjects] = useState([]);
  const [usfms, setUsfms] = useState();

  const link = `https://${server}/${owner}/${repo}/raw/branch/master/manifest.yaml`;
  useEffect(() => {
    axios
      .get(link)
      .then((res) => {
        const json = res.data ? YAML.load(res.data) : null;

        setProjects(json.projects);
      })
      .catch((err) => console.log(err));
  }, [link]);
  useDeepCompareEffect(() => {
    const _projects = projects.filter((project) => {
      if (bookCodes) {
        return bookCodes.includes(project.identifier);
      }
    });
    setFilterProjects(_projects);
  }, [bookCodes, projects]);

  useDeepCompareEffect(() => {
    const _usfm = {};

    const getProjects = async () => {
      await Promise.all(
        filterProjects.map((project) =>
          axios
            .get(
              `https://git.door43.org/${owner}/${repo}/raw/branch/master/${project.path.substr(
                2
              )}`
            )
            .then((data) => {
              _usfm[project.identifier] = data.data;
            })
            .catch((err) => console.log(err))
        )
      );

      if (Object.keys(_usfm).length === bookCodes.length) {
        setUsfms(_usfm);
      }
    };

    getProjects();
  }, [filterProjects]);

  return { projects, usfms };
}

export default useFetchUsfm;
